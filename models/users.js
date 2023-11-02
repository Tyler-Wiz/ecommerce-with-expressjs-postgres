const db = require("../db/index");

class UserModel {
  // Create new user
  async create(email, password, firstName, lastName) {
    try {
      const statement = `INSERT INTO users(email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [email, password, firstName, lastName];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  // Find user by Email
  async findOneByEmail(email) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserModel();
