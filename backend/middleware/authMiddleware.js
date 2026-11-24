
const jwt = require("jsonwebtoken");

// Verify whether the user has a valid JWT from the HTTP-only cookie
const protect = (req, res, next) => {
  // Check server configuration
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing from environment variables.");

    return res.status(500).json({
      message: "Server authentication configuration error."
    });
  }

  try {
    // Read JWT from the HTTP-only cookie
    const token = req.cookies?.token;

    // Check whether the cookie exists
    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please log in."
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate the decoded token payload
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.id ||
      !["student", "admin"].includes(decoded.role)
    ) {
      return res.status(401).json({
        message: "Invalid authentication token."
      });
    }

    // Attach authenticated user information to the request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Your session has expired. Please log in again."
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid authentication token."
      });
    }

    console.error("Authentication error:", error.message);

    return res.status(500).json({
      message: "Authentication failed due to a server error."
    });
  }
};


// Check whether the authenticated user has the required role
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required. Please log in."
      });
    }

    if (
      allowedRoles.length === 0 ||
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    next();
  };
};


module.exports = {
  protect,
  authorize
};
