const db = require("./index");

class ProductModel {
  async findMany() {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM products ORDER BY price DESC`;
      const values = [];
      // Send SQL Statement to Database and Await Response
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        // Return the all rows from products table
        return result.rows;
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
  async findUnique(product_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT * FROM products WHERE product_id = $1`;
      const values = [product_id];
      // Await Response from Database
      const result = await db.query(statement, values);
      // Return the first row or rows that matches
      if (result.rows?.length) {
        return result.rows[0];
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
  async addProduct(data) {
    try {
      //Generate SQL statement
      const statement = `INSERT INTO products(name, description, price, category) VALUES($1, $2, $3, $4) RETURNING*`;
      const values = [data.name, data.description, data.price, data.category];
      // Await Response from Database
      const result = await db.query(statement, values);
      // Return the first row or rows that matches
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (err) {
      throw new Error(err);
    }
  }

  async addMultipleProducts(data) {
    try {
      const statement = `INSERT INTO products(name, description, features, price, keywords, url, category, subcategory) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*`;
      data.forEach(async (record) => {
        const values = [
          record.name,
          record.description,
          record.features,
          record.price,
          record.keywords,
          record.url,
          record.category,
          record.subcategory,
        ];
        await db.query(statement, values);
      });
      return "Upload Successful";
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new ProductModel();
