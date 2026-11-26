const verifyOrigin = (req, res, next) => {
  const allowedOrigin = (
    process.env.FRONTEND_URL || "http://localhost:5173"
  ).replace(/\/+$/, "");

  const requestOrigin = req.get("Origin");

  // Reject requests without an Origin header
  if (!requestOrigin) {
    return res.status(403).json({
      message: "Request origin could not be verified.",
    });
  }

  // Reject requests from untrusted origins
  if (requestOrigin.replace(/\/+$/, "") !== allowedOrigin) {
    return res.status(403).json({
      message: "Request blocked. Untrusted origin.",
    });
  }

  return next();
};

module.exports = verifyOrigin;
