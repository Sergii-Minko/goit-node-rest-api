const parseBoolean = (value, defaultValue) => {
  if (
    typeof value !== "string" &&
    typeof value !== "boolean" &&
    typeof value == "undefined"
  ) {
    return defaultValue;
  }

  return value === "true" ? true : false;
};

const parseFavoriteParams = ({ favorite }) => {
  const parsedFavorite = parseBoolean(favorite, "");

  return {
    favorite: parsedFavorite,
  };
};

export default parseFavoriteParams;
