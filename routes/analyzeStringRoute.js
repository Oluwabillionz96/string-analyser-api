import express from "express";
import addString from "../controllers/addString.js";
import validateStringValue from "../middlewares/validateStringValue.js";
import getStringByValue from "../controllers/getStringByValue.js";
import getStringByQueries from "../controllers/getStringByQueries.js";
import queryByNaturalLanguage from "../controllers/queryByNaturalLanguage.js";
import deleteString from "../controllers/deleteString.js";

const analyzeStringRoute = express.Router();

analyzeStringRoute.post("/strings", validateStringValue, addString);
analyzeStringRoute.get("/strings", getStringByQueries);
analyzeStringRoute.get(
  "/strings/filter-by-natural-language",
  queryByNaturalLanguage
);
analyzeStringRoute.get("/strings/:string_value", getStringByValue);
analyzeStringRoute.delete("/strings/:string_value", deleteString);

export default analyzeStringRoute;
