import { strings } from "../app.js";
import AppError from "../utils/AppError.js";
import parseNaturalLanguageQuery from "../utils/parseNaturalLanguageQuery.js";

const queryByNaturalLanguage = (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new AppError("Query parameter required", 400));
  }

  const parsedFilters = parseNaturalLanguageQuery(query);

  if (Object.keys(parsedFilters).length === 0) {
    return next("Unable to parse natural language query", 400);
  }

  let data = strings.filter((item) => {
    if (parsedFilters.is_palindrome !== undefined) {
      if (item.properties.is_palindrome !== parsedFilters.is_palindrome) {
        return false;
      }
    }

    if (parsedFilters.word_count !== undefined) {
      if (item.properties.word_count !== parsedFilters.word_count) {
        return false;
      }
    }

    if (parsedFilters.min_length !== undefined) {
      if (item.properties.length < parsedFilters.min_length) {
        return false;
      }
    }

    if (parsedFilters.max_length !== undefined) {
      if (item.properties.length > parsedFilters.max_length) {
        return false;
      }
    }

    if (parsedFilters.contains_character !== undefined) {
      if (
        !item.value.toLowerCase().includes(parsedFilters.contains_character)
      ) {
        return false;
      }
    }

    return true;
  });

  return res.status(200).json({
    data,
    count: data.length,
    interpreted_query: {
      original: query,
      parsed_filters: parsedFilters,
    },
  });
};

export default queryByNaturalLanguage;
