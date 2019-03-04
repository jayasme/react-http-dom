class HttpError extends Error {
  constructor({ statusCode, message, data }) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default HttpError;
