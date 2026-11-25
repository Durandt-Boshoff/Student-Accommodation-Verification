const jwt = require("jsonwebtoken");

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

const protect = (req, res, next) => {
  // Check server configuration
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing from environment variables.");

    return res.status(500).json({
      message: "Server authentication configuration error.",
    });
  }

  try {
    // Read JWT from the HTTP-only cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please log in.",
      });
    }

    // Verify the JWT using the expected algorithm
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        algorithms: ["HS256"],
      }
    );

    // Validate the decoded token payload
    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "string" ||
      !decoded.id.trim() ||
      !["student", "admin"].includes(decoded.role)
    ) {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    // Attach authenticated user information to the request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();

  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message:
          error.name === "TokenExpiredError"
            ? "Your session has expired. Please log in again."
            : "Invalid authentication token.",
      });
    }

    console.error("Authentication error:", error.message);

    return res.status(500).json({
      message: "Authentication failed due to a server error.",
    });
  }
};

// ==========================================
// AUTHORIZATION MIDDLEWARE
// ==========================================

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    if (
      allowedRoles.length === 0 ||
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }

    return next();
  };
};

module.exports = {
  protect,
  authorize,
};
