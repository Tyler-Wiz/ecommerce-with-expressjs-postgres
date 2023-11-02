const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
};

module.exports = { errorHandler };
