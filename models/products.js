const db = require("../db/index");

class ProductModel {
  async findMany() {
    try {
      const statement = `SELECT * FROM products`;
      const values = [];
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUnique(id) {
    try {
      const statement = `SELECT * FROM products WHERE id = $1`;
      const values = [id];
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new ProductModel();
