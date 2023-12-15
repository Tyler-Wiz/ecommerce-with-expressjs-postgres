// Package imports
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  register,
  registerAdmin,
  registerMiddleWare,
  login,
} = require("../controller/authController");

// Register Normal Users //
router.post("/register", registerMiddleWare, register);
// Register Admin Access Users //
router.post("/admin", registerMiddleWare, registerAdmin);
// Login A user //
router.post("/login", passport.authenticate("Local-Strategy"), login);

module.exports = router;
