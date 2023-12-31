const createError = require("http-errors");
const UserModel = require("../models/users");
const { passwordHash } = require("../utils/bcrypt");
const genAuthToken = require("../utils/genAuthToken");

exports.registerMiddleWare = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check input
    if (!email) throw createError(404, "Email is required");
    if (!password) throw createError(404, "Password is required");
    // Check if user already exist
    const user = await UserModel.findOneByEmail(email);
    if (user) throw createError(409, "Email already in use");
    // Hash Password
    const hashedPassword = await passwordHash(password, 10);
    req.hashedPassword = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const password = req.hashedPassword;
  const { email, username } = req.body;
  try {
    // Create user in Database
    const response = await UserModel.create(email, password, username);
    // Convert response to JWT
    const token = await genAuthToken(response);
    //Send response to client
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
};

exports.registerAdmin = async (req, res, next) => {
  const password = req.hashedPassword;
  const { email, is_admin, username } = req.body;
  try {
    if (!is_admin) throw createError(404, "Admin is required");
    // Create user in Database
    const response = await UserModel.createAdmin(
      email,
      password,
      username,
      is_admin
    );
    // Convert response to JWT
    const token = await genAuthToken(response);
    //Send response to client
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  try {
    // Convert response to JWT
    const token = await genAuthToken(req.user);
    //Send response to client
    res.send(token);
  } catch (err) {
    next(err);
  }
};
