const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const UserModel = require("../models/users");
const getUserToken = require("../utils/genUserToken");

router.get("", async (req, res, next) => {
  const user = req.user;
  try {
    const users = await UserModel.findMany();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const user_id = req.params.id;
  try {
    const user = await UserModel.findUnique(user_id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const user_id = req.params.id;
  const data = req.body;
  try {
    const user = await UserModel.findUnique(user_id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    await UserModel.updateOne(data);
    const updatedUser = await UserModel.findUnique(user_id);
    const token = await getUserToken(updatedUser);
    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
