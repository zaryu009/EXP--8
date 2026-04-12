const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const { getStorageMode, initializeUserStore } = require("./services/userStore");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret =
  process.env.JWT_SECRET && process.env.JWT_SECRET !== "replace_with_a_strong_secret"
    ? process.env.JWT_SECRET
    : "dev_jwt_secret_change_me";

process.env.JWT_SECRET = jwtSecret;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin is not allowed."));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "build");

  app.use(express.static(buildPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || "Internal server error.",
  });
});

const startServer = async () => {
  try {
    const storage = await initializeUserStore(process.env.MONGODB_URI);
    console.log(storage.message);
    console.log(`Auth storage mode: ${getStorageMode()}`);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
