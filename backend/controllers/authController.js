const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// ==========================================
// STUDENT REGISTRATION
// ==========================================

const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (
      typeof full_name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !full_name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Full name, email and password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: existingUser, error: searchError } =
      await supabase
        .from("users")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

    if (searchError) throw searchError;

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    // Hash password before storing it
    const password_hash = await bcrypt.hash(password, 12);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          full_name: full_name.trim(),
          email: normalizedEmail,
          password_hash,
          role: "student"
        }
      ])
      .select("id, full_name, email, role, created_at")
      .single();

    if (error) throw error;

    return res.status(201).json({
      message: "Student account created successfully.",
      user: newUser
    });

  } catch (error) {
    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Unable to create account."
    });
  }
};


// ==========================================
// USER LOGIN
// ==========================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: user, error } = await supabase
      .from("users")
      .select("id, full_name, email, role, password_hash")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    if (!["student", "admin"].includes(user.role)) {
      return res.status(403).json({
        message: "Invalid user role."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
      }
    );

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    });

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      },
      redirectTo:
        user.role === "admin"
          ? "/admin/dashboard"
          : "/student/dashboard"
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in. Please try again."
    });
  }
};


// ==========================================
// USER LOGOUT
// ==========================================

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return res.status(200).json({
    message: "Logged out successfully."
  });
};


// ==========================================
// EXPORT AUTHENTICATION FUNCTIONS
// ==========================================

module.exports = {
  signup,
  login,
  logout
};