const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWTSECRET_KEY;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;
