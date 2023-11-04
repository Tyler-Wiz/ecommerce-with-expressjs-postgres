const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const UserModel = require("../models/users");

router.get("", async (req, res, next) => {
  try {
    const users = await UserModel.findMany();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findUnique(id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = await UserModel.findUnique(id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    await UserModel.updateOne(data);
    const updatedUser = await UserModel.findUnique(id);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
