import { strings } from "../app.js";
import analyzeString from "../utils/analyzeString.js";
import AppError from "../utils/AppError.js";

const addString = (req, res, next) => {
  const { value } = req.body;

  const doesValueExsist = strings.find((item) => item.value === value);

  if (doesValueExsist !== undefined) {
    return next(new AppError("String already exists in the system", 409));
  }

  const analyzedString = analyzeString(value);
  strings.push(analyzedString);
  return res.status(201).json(analyzedString);
};

export default addString;
