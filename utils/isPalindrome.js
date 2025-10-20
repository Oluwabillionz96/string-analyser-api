const isPalindrome = (string) => {
  const reversedString = string.split("").reverse().join("");

  return reversedString.toLowerCase() === string.toLowerCase();
};

export default isPalindrome;
