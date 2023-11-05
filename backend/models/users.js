const db = require("../db/index");

class UserModel {
  // Create new user
  async create(email, password, username) {
    try {
      // Generate SQL statement
      const statement = `INSERT INTO users(email, password, username) VALUES ($1, $2, $3) RETURNING *`;
      const values = [email, password, username];
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
  async findUnique(user_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM users WHERE user_id = $1`;
      const values = [user_id];
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
  async findMany() {
    try {
      // Generate SQL statement
      const statement = ` SELECT * FROM users`;
      const values = [];
      // Await Response from Database
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the list of All Users
        return result.rows;
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateOne(data) {
    try {
      // Generate SQL statement
      const statement = `UPDATE users SET username = $2, first_name = $3, last_name = $4, address= $5 WHERE user_id = $1`;
      const values = [
        data.user_id,
        data.username,
        data.first_name,
        data.last_name,
        data.address,
      ];
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
}

module.exports = new UserModel();
