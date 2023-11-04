// Package imports
const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const passport = require("passport");
const genAuthToken = require("../utils/genAuthToken");

// Custom imports
const UserModel = require("../models/users");
const { passwordHash } = require("../utils/bcrypt");

router.post("/register", async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    // check input
    if (!email) throw createError(404, "Email is required");
    if (!password) throw createError(404, "Password is required");
    // Check if user already exist
    const user = await UserModel.findOneByEmail(email);
    if (user) throw createError(409, "Email already in use");
    // Hash Password
    const hashedPassword = await passwordHash(password, 10);
    // Create user in Database
    const response = await UserModel.create(email, hashedPassword, username);
    // Convert response to JWT
    const token = await genAuthToken(response);
    //Send response to client
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("Local-Strategy"),
  async (req, res, next) => {
    // Convert response to JWT
    const token = await genAuthToken(req.user);
    //Send response to client
    res.send(token);
    next();
  }
);

module.exports = router;
