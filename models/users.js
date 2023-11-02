const db = require("../db/index");

class UserModel {
  // Create new user
  async create(email, password, name) {
    try {
      const statement = `INSERT INTO users(email, password, name) VALUES ($1, $2, $3) RETURNING *`;
      const values = [email, password, name];
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
