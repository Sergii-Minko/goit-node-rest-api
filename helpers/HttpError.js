const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = "Not Found") => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

export default HttpError;
