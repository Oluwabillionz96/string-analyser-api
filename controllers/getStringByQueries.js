import { strings } from "../app.js";
import AppError from "../utils/AppError.js";

const getStringByQueries = (req, res, next) => {
  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character,
  } = req.query;

  let stringArray = [...strings];

  if (is_palindrome !== undefined) {
    if (is_palindrome !== "true" && is_palindrome !== "false") {
      return next(new AppError("Invalid query parameter values or types", 400));
    }
    stringArray = stringArray.filter(
      (item) => item.properties.is_palindrome.toString() === is_palindrome
    );
  }

  if (min_length !== undefined) {
    if (isNaN(Number.parseInt(min_length))) {
      return next(new AppError("Invalid query parameter values or types", 400));
    }
    stringArray = stringArray.filter(
      (item) => item.value.length >= Number.parseInt(min_length)
    );
  }

  if (max_length !== undefined) {
    if (isNaN(Number.parseInt(max_length))) {
      return next(new AppError("Invalid query parameter values or types", 400));
    }
    stringArray = stringArray.filter(
      (item) => item.value.length <= Number.parseInt(max_length)
    );
  }

  if (word_count !== undefined) {
    if (isNaN(Number.parseInt(word_count))) {
      return next(new AppError("Invalid query parameter values or types", 400));
    }
    stringArray = stringArray.filter(
      (item) => item.properties.word_count === Number.parseInt(word_count)
    );
  }

  if (contains_character !== undefined) {
    stringArray = stringArray.filter((item) =>
      item.value.includes(contains_character)
    );
  }

  return res.status(200).json({
    data: stringArray,
    count: stringArray.length,
    filters_applied: {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    },
  });
};

export default getStringByQueries;
