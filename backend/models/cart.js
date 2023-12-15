const db = require("./index");

class CartModel {
  async create(user_id) {
    try {
      const statement = `INSERT INTO cart (user_id) VALUES ($1) RETURNING *`;
      const values = [user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUniqueCart(user_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *FROM cart WHERE user_id = $1`;
      const values = [user_id];

      // Execute SQL statment
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

module.exports = new CartModel();
