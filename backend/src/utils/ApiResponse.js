class ApiResponse {
  constructor(status, message, data = null) {
    this.success = true;
    this.statusCode = this.statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
