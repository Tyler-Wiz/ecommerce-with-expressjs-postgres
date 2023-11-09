const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { PORT, DB_CONNECT } = require("./config");
const { errorHandler } = require("./middlewares/errorHandler");
const { protectedRoutes } = require("./middlewares/protectedRoutes");
const genFunc = require("connect-pg-simple");
require("./middlewares/passportLocal");

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: DB_CONNECT,
});

// ----------------------------- START MIDDLEWARES -----------------------------
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httponly: false,
      secure: false,
      sameSite: "none",
      expires: 7 * 24 * 3600 * 1000,
    },
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// -–-
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
