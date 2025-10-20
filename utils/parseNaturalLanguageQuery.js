const parseNaturalLanguageQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  const filters = {};

  if (lowerQuery.includes("palindrome") || lowerQuery.includes("palindromic")) {
    filters.is_palindrome = true;
  }

  if (lowerQuery.includes("single word")) {
    filters.word_count = 1;
  }

  if (lowerQuery.includes("two word") || lowerQuery.includes("2 word")) {
    filters.word_count = 2;
  }

  if (lowerQuery.includes("first vowel")) {
    filters.contain_character = "a";
  }

  const longerThanMatch = lowerQuery.match(/longer than (\d+)/);
  if (longerThanMatch) {
    filters.min_length = parseInt(longerThanMatch[1]) + 1;
  }

  const shorterThanMatch = lowerQuery.match(/shorter than (\d+)/);
  if (shorterThanMatch) {
    filters.max_length = parseInt(shorterThanMatch[1]) - 1;
  }

  const containsLetterMatch = lowerQuery.match(
    /contain(?:s|ing)? (?:the )?letter ([a-z])/
  );
  if (containsLetterMatch) {
    filters.contains_character = containsLetterMatch[1];
  }

  return filters;
};

export default parseNaturalLanguageQuery;
