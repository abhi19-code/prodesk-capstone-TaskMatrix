const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(helmet());

const logsFolder = path.join(__dirname, "logs");
fs.mkdirSync(logsFolder, { recursive: true });

const accessLogStream = fs.createWriteStream(
  path.join(logsFolder, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

const allowedOrigins = (process.env.CLIENT_URLS || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    }
  })
);

app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", apiLimiter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    process.stdout.write("MongoDB connected\n");
  })
  .catch((error) => {
    process.stderr.write(`MongoDB connection error: ${error.message}\n`);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("TaskMatrix server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  process.stdout.write(`Server running on port ${PORT}\n`);
});
