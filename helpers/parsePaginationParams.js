const parseNumber = (value, defaultValue) => {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};

const parseBooleanValue = (value, defaultValue) => {
  console.log(value);
  if (typeof value !== "string" && typeof value !== undefined) {
    return defaultValue;
  }

  return value === "true" ? true : false;
};

const parsePaginationParams = ({ page, limit, favorite }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedLimit = parseNumber(limit, 20);
  const parseBoolean = parseBooleanValue(favorite, "");

  return {
    page: parsedPage,
    limit: parsedLimit,
    favorite: parseBoolean,
  };
};

export default parsePaginationParams;
