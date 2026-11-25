
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT || 3000;

// Frontend URL for CORS
const frontendUrl = (
  process.env.FRONTEND_URL || "http://localhost:5173"
).trim().replace(/\/+$/, "");

// ==========================================
// GLOBAL MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ==========================================
// API ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ResiSure API is running!",
    status: "OK",
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(port, () => {
  console.log(`ResiSure API is running on port ${port}`);
  console.log(`Allowed frontend origin: ${frontendUrl}`);
});
