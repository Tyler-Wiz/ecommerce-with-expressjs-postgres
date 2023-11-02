const bcrypt = require("bcrypt");

class Password {
  // Create password hashing function below:
  async passwordHash(password, saltRounds) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  //  Compare the hashed password
  async comparePasswords(password, hash) {
    try {
      const matchFound = await bcrypt.compare(password, hash);
      return matchFound;
    } catch (err) {
      console.log(err);
    }
    return false;
  }
}

module.exports = new Password();
