
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
} = require("../controllers/authController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const verifyOrigin = require("../middleware/csrfMiddleware");

// ==========================================
// PUBLIC AUTHENTICATION ROUTES
// ==========================================

// Student registration
router.post("/signup", verifyOrigin, signup);

// Shared login for students and administrators
router.post("/login", verifyOrigin, login);

// User logout
router.post("/logout", verifyOrigin, logout);

// ==========================================
// AUTHENTICATED USER ROUTES
// ==========================================

// Get the currently authenticated user
router.get("/me", protect, (req, res) => {
  return res.status(200).json({
    message: "User authenticated successfully.",
    user: req.user,
  });
});

// ==========================================
// ROLE-BASED ACCESS CONTROL
// ==========================================

// Student-only test route
router.get(
  "/student-test",
  protect,
  authorize("student"),
  (req, res) => {
    return res.status(200).json({
      message: "Student access granted!",
    });
  }
);

// Admin-only test route
router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {
    return res.status(200).json({
      message: "Admin access granted!",
    });
  }
);

module.exports = router;
