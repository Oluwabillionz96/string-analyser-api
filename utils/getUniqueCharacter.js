const getUniqueCharacter = (string) => {
  const uniqueCharacters = Array.from(new Set(string.replaceAll(" ", ""))).join(
    ""
  );
  return uniqueCharacters.length;
};

export default getUniqueCharacter;
