
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// ==========================================
// JWT AND COOKIE CONFIGURATION
// ==========================================

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Convert JWT expiry into seconds.
// Supported examples: 30s, 15m, 12h, 1d, 7d.
const parseExpiryToSeconds = (expiry) => {
  const match = String(expiry)
    .trim()
    .match(/^(\d+)\s*(s|sec|seconds?|m|min|minutes?|h|hours?|d|days?|w|weeks?)?$/i);

  if (!match) {
    throw new Error(
      "Invalid JWT_EXPIRES_IN. Use a value such as 15m, 12h or 1d."
    );
  }

  const amount = Number(match[1]);
  const unit = (match[2] || "s").toLowerCase();

  const multipliers = {
    s: 1,
    sec: 1,
    second: 1,
    seconds: 1,

    m: 60,
    min: 60,
    minute: 60,
    minutes: 60,

    h: 3600,
    hour: 3600,
    hours: 3600,

    d: 86400,
    day: 86400,
    days: 86400,

    w: 604800,
    week: 604800,
    weeks: 604800,
  };

  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error(
      "JWT_EXPIRES_IN must be a positive whole number."
    );
  }

  const seconds = amount * multipliers[unit];

  if (!Number.isSafeInteger(seconds)) {
    throw new Error("JWT expiry value is too large.");
  }

  return seconds;
};

const JWT_EXPIRES_IN_SECONDS = parseExpiryToSeconds(JWT_EXPIRES_IN);

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: JWT_EXPIRES_IN_SECONDS * 1000,
};

// ==========================================
// STUDENT REGISTRATION
// ==========================================

const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body || {};

    if (
      typeof full_name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !full_name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Full name, email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Validate email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Check whether the email already exists
    const { data: existingUser, error: searchError } =
      await supabase
        .from("users")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

    if (searchError) throw searchError;

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
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
          role: "student",
        },
      ])
      .select("id, full_name, email, role, created_at")
      .single();

    // Handle duplicate email constraint
    if (error?.code === "23505") {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    if (error) throw error;

    return res.status(201).json({
      message: "Student account created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Unable to create account.",
    });
  }
};

// ==========================================
// USER LOGIN
// ==========================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
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

    if (!user || !user.password_hash) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare submitted password with stored hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Validate user role
    if (!["student", "admin"].includes(user.role)) {
      return res.status(403).json({
        message: "Invalid user role.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN_SECONDS,
        algorithm: "HS256",
      }
    );

    // Store JWT in an HTTP-only cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      redirectTo:
        user.role === "admin"
          ? "/admin/dashboard"
          : "/student/dashboard",
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in. Please try again.",
    });
  }
};

// ==========================================
// USER LOGOUT
// ==========================================

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: COOKIE_OPTIONS.httpOnly,
    secure: COOKIE_OPTIONS.secure,
    sameSite: COOKIE_OPTIONS.sameSite,
    path: COOKIE_OPTIONS.path,
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
};

// ==========================================
// EXPORT AUTHENTICATION FUNCTIONS
// ==========================================

module.exports = {
  signup,
  login,
  logout,
};
