import express from "express";
import analyzeString from "./utils/analyzeString.js";

const app = express();

app.listen(5000, () => {
  console.log(analyzeString("string to analyze"));
});
