// Signup route
const express = require("express");
const bcrypt = require("bcryptjs");
const supabase = require("../supabase");

const router = express.Router();

// Create a new user account
router.post("/signup", async (req, res) => {
  try {
    const fullName = (req.body.full_name || req.body.name || "").trim();
    const { email, password } = req.body;

    // Check that all fields have been filled in
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if the email is already registered
    const { data: existing, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (lookupError) {
      console.error(lookupError);
      return res.status(500).json({
        message: "Something went wrong. Please try again."
      });
    }

    if (existing) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    // Hash the password before saving it
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the new user in the database
    const { data: user, error: insertError } = await supabase
      .from("users")
      .insert({
        full_name: fullName,
        email: cleanEmail,
        password_hash: passwordHash,
        role: "user",
      })
      .select("id, full_name, email, role")
      .single();

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({
        message: "Could not create your account."
      });
    }

    // Send the account details back without the password hash
    return res.status(201).json({
      message: "Account created.",
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong. Please try again."
    });
  }
});

module.exports = router;