const db = require("../db/index");

class UserModel {
  // Create new user
  async create(email, password, name) {
    try {
      // Generate SQL statement
      const statement = `INSERT INTO users(email, password, name) VALUES ($1, $2, $3) RETURNING *`;
      const values = [email, password, name];
      // Send SQL Statement to Database and Await Response
      const result = await db.query(statement, values);
      // Check and return new user added
      if (result.rows?.length) {
        // Return the first row that matches
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
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUnique(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE id = $1`;
      const values = [id];
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the first row that matches
        return result.rows[0];
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserModel();
