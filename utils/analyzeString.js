import characterFrequencyMap from "./characterFrequencyMap.js";
import generateSHA256 from "./generateSHA256.js";
import getUniqueCharacter from "./getUniqueCharacter.js";
import isPalindrome from "./isPalindrome.js";

const analyzeString = (string) => {
  const stringAnalysis = {
    id: generateSHA256(string),
    value: string,
    properties: {
      length: string.length,
      is_palindrome: isPalindrome(string),
      unique_characters: getUniqueCharacter(string),
      word_count: string.split(" ").length,
      sha256_hash: generateSHA256(string),
      character_frequency_map: characterFrequencyMap(string),
    },
    created_at: new Date().toISOString(),
  };

  return stringAnalysis;
};

export default analyzeString;
