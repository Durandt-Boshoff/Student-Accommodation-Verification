const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout
} = require("../controllers/authController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

const verifyOrigin = require("../middleware/csrfMiddleware");

// Student registration
router.post("/signup", verifyOrigin, signup);

// Shared login for students and administrators
router.post("/login", verifyOrigin, login);

// User logout
router.post("/logout", verifyOrigin, logout);

// Get the currently authenticated user
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "User authenticated successfully.",
    user: req.user
  });
});

// Student-only test route
router.get(
  "/student-test",
  protect,
  authorize("student"),
  (req, res) => {
    res.status(200).json({
      message: "Student access granted!"
    });
  }
);

// Admin-only test route
router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Admin access granted!"
    });
  }
);

module.exports = router;