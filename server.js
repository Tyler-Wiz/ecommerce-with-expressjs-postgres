const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { PORT } = require("./config");
const { errorHandler } = require("./middlewares/errorHandler");
const { protectedRoutes } = require("./middlewares/protectedRoutes");
require("./middlewares/passportLocal");

// ----------------------------- START MIDDLEWARES -----------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------- END MIDDLEWARES -----------------------------

// ------------------ START ROUTE IMPORTS -------------------------
const Auth = require("./routes/auth");
const Products = require("./routes/products");
const Users = require("./routes/users");

// Routes
app.use("/auth", Auth);
app.use("/users", Users);

// Protected Routes
// app.use(protectedRoutes);
app.use("/products", Products);

// Error handling middleware
app.use(errorHandler);

// ------------------ END ROUTE IMPORTS -------------------------

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
