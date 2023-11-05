const db = require("../db/index");

class CartItemModel {
  async checkIfItemExist(product_id, cart_id) {
    try {
      const statement = `SELECT COUNT(*) 
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.product_id
                      WHERE ci.product_id = $1 AND ci.cart_id = $2 `;
      const values = [product_id, cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async incrementItemBy1(product_id, cart_id) {
    try {
      const statement = `UPDATE cart_items ci
                        SET quantity = quantity + 1
                        WHERE ci.product_id = $1
                        AND ci.cart_id = $2 `;
      const values = [product_id, cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async addItemToCart(cart_id, product_id) {
    try {
      const statement = `INSERT INTO cart_items (cart_id, product_id, quantity ) VALUES ($1, $2, DEFAULT) RETURNING *`;
      const values = [cart_id, product_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async loadCartItems(cart_id) {
    try {
      const statement = `SELECT ci.cart_item_id, p.name, p.price, ci.quantity, p.product_id
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.product_id
                      WHERE ci.cart_id = $1;`;
      const values = [cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUniqueItem(cart_item_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT ci.cart_item_id, p.name, p.price, p.description, p.category, ci.quantity
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.product_id
                      WHERE ci.cart_item_id = $1;`;
      const values = [cart_item_id];

      // Execute SQL statement
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

module.exports = new CartItemModel();
