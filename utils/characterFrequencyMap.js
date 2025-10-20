const characterFrequencyMap = (string) => {
  const frequencyMap = {};

  for (const char of string.replaceAll(" ", "")) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }

  return frequencyMap;
};

export default characterFrequencyMap;
