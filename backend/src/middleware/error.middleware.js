const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Custom API Errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // Mongo duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value found",
    });
  }

  // Default
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
