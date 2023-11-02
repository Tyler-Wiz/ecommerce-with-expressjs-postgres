const express = require("express");
const app = express();
const { PORT } = require("./config");
const UserModel = require("./models/users");
const createError = require("http-errors");
const Password = require("./utils/bcrypt");

const bodyParser = require("body-parser");

// Transforms raw string of req.body into JSON
app.use(bodyParser.json());

// Parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

app.post("/register", async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await UserModel.findOneByEmail(email);
    if (user) throw createError(409, "Email already in use");
    // Check if password field is empty
    if (!password) throw createError(404, "password is required");
    // Hash Password
    const newPassword = await Password.passwordHash(password, 10);
    // Create user in Database
    const response = await UserModel.create(
      email,
      newPassword,
      firstName,
      lastName
    );
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});
