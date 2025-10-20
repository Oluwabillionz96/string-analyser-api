import express from "express";
import analyzeStringRoute from "./routes/analyzeStringRoute.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const app = express();

app.use(cors());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(limiter);

export const strings = [];

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to string analyser" });
});

app.use(analyzeStringRoute);

app.listen(5000, () => {
  console.log("App is running");
});

app.use((req, res) => {
  return res
    .status(404)
    .json({ error: "The route you are looking for was not found" });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: err.message || "Internal Server error",
  });
});
