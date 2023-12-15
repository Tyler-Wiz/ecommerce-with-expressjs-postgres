const UserModel = require("../models/users");
const createError = require("http-errors");
const getUserToken = require("../utils/genUserToken");
const joi = require("joi");

exports.read = async (req, res, next) => {
  try {
    const users = await UserModel.findMany();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.readUnique = async (req, res, next) => {
  const user_id = req.params.id;
  try {
    const user = await UserModel.findUnique(user_id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUserById = async (req, res, next) => {
  const user_id = req.params.id;
  const schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    address: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  const { first_name, last_name, address } = req.body;
  try {
    const user = await UserModel.findUnique(user_id);
    if (user === null) throw createError(404, "User Doesn't Exist");
    if (error) throw createError(404, "User Details Are required");
    await UserModel.updateOne(user_id, first_name, last_name, address);
    const updatedUser = await UserModel.findUnique(user_id);
    const token = await getUserToken(updatedUser);
    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const deletedUser = await UserModel.deleteById(user_id);
    if (deletedUser) {
      res.send(`User with ${user_id} has been deleted`);
    }
  } catch (err) {
    next(err);
  }
};
