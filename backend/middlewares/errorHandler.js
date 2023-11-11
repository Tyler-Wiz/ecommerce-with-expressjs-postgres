const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    errorMessage: err.message,
    status: err.status,
  });
};

module.exports = { errorHandler };
