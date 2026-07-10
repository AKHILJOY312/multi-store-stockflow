class ApiError extends Error {
  constructor(statusCode, data, message = "Success") {
    super(message);

    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.data = data;
  }
}

export default ApiError;
