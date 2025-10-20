import { strings } from "../app.js";
import AppError from "../utils/AppError.js";

const getStringByValue = (req, res, next) => {
  const { string_value } = req.params;

  const index = strings.findIndex((item) => item.value === string_value);
  if (index < 0) {
    return next(new AppError("String does not exist in the system", 404));
  }

  return res.status(200).json(strings[index]);
};

export default getStringByValue;
