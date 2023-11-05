const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { PORT } = require("./config");
const { errorHandler } = require("./middlewares/errorHandler");
const { protectedRoutes } = require("./middlewares/protectedRoutes");
const genFunc = require("connect-pg-simple");
require("./middlewares/passportLocal");

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: "postgres://postgres:123456@localhost:5432/api",
});

// ----------------------------- START MIDDLEWARES -----------------------------
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);
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
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------- END MIDDLEWARES -----------------------------

// ------------------ START ROUTE IMPORTS -------------------------
const Auth = require("./routes/auth");
const Products = require("./routes/products");
const Users = require("./routes/users");
const Cart = require("./routes/cart");

// Routes
app.use("/auth", Auth);

// Protected Routes
app.use(protectedRoutes);
app.use("/products", Products);
app.use("/cart", Cart);
app.use("/users", Users);

// Error handling middleware
app.use(errorHandler);

// ------------------ END ROUTE IMPORTS -------------------------

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
