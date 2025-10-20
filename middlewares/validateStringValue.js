import AppError from "../utils/AppError.js";

const validateStringValue = async (req, res, next) => {
  if (
    !(
      req.body !== null &&
      typeof req.body === "object" &&
      !Array.isArray(req.body)
    )
  ) {
    return next(new AppError("Invalid request", 400));
  }

  const { value } = req.body;
  if (!value || !value.trim()) {
    return next(
      new AppError("Invalid request body or missing 'value' field", 400)
    );
  }

  if (typeof value !== "string") {
    return next(
      new AppError("Invalid data type for 'value' (must be string)", 422)
    );
  }

  const result = req.body.value;

  req.body = { value: result.trim() };
  next();
};

export default validateStringValue;
