const createError = require("http-errors");

const protectedRoutes = (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "Unauthorized to access");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { protectedRoutes };
