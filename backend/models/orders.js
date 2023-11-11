const db = require("../db/index");

class orderModel {
  async create(cart_id) {
    try {
      const statement = `INSERT INTO orders(cart_id) VALUES($1) RETURNING*`;
      const values = [cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findOrderByUser(cart_id) {
    try {
      const statement = `SELECT * FROM orders WHERE orders.cart_id =  $1`;
      const values = [cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUniqueOrder(cart_id, order_id) {
    try {
      const statement = `SELECT * FROM orders WHERE orders.cart_id = $1 AND order_id = $2`;
      const values = [cart_id, order_id];
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

module.exports = new orderModel();
