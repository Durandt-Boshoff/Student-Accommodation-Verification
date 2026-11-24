// CSRF PROTECTION USING ORIGIN VALIDATION

const verifyOrigin = (req, res, next) => {
  const allowedOrigin =
    process.env.FRONTEND_URL || "http://localhost:5173";

  const requestOrigin = req.get("Origin");

  // Reject requests without an Origin header
  if (!requestOrigin) {
    return res.status(403).json({
      message: "Request origin could not be verified."
    });
  }

  // Allow requests only from the trusted frontend
  if (requestOrigin !== allowedOrigin) {
    return res.status(403).json({
      message: "Request blocked. Untrusted origin."
    });
  }

  next();
};

module.exports = verifyOrigin;