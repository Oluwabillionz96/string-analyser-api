import { strings } from "../app.js";
import AppError from "../utils/AppError.js";

const deleteString = (req, res, next) => {
  const { string_value } = req.params;

  const stringToBedeleted = strings.findIndex(
    (item) => item.value === string_value
  );

  if (stringToBedeleted < 0) {
    return next(new AppError("String does not exist in the system", 404));
  }

  strings.splice(stringToBedeleted, 1);
  return res.status(204).send();
};

export default deleteString;
