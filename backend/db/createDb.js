const { Client } = require("pg");
const { PG } = require("../config");

(async () => {
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS users (
    user_id          SERIAL PRIMARY KEY,
    username         VARCHAR(50) NOT NULL,
    email            VARCHAR(100) UNIQUE NOT NULL,
    password         VARCHAR(255) NOT NULL,
    first_name       VARCHAR(50),
    last_name        VARCHAR(50),
    address          VARCHAR(255),
    created_at       DATE DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS products (
      product_id       SERIAL PRIMARY KEY,
      name             VARCHAR(255) NOT NULL,
      description      TEXT,
      price            DECIMAL(10, 2)   NOT NULL,
      category         VARCHAR(100),
      updated_at       DATE DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS cart (
    cart_id         SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(user_id),
    created_at      DATE DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id    SERIAL PRIMARY KEY,
    cart_id         INTEGER REFERENCES cart(cart_id),
    product_id      INTEGER REFERENCES products(product_id),
    quantity        INTEGER DEFAULT 1
    );`,
    `CREATE TABLE IF NOT EXISTS session (
    sid             VARCHAR(255) PRIMARY KEY,
    sess            JSON ,
    expire          DATE DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS orders (
     order_id    SERIAL PRIMARY KEY,
     cart_id     INTEGER REFERENCES cart(cart_id),
     created_at      DATE DEFAULT CURRENT_TIMESTAMP
    );`,
  ];

  try {
    const client = new Client({
      user: PG.DBUSER,
      host: PG.DBHOST,
      database: PG.DBDATABASE,
      password: PG.DBPASSWORD,
      port: PG.DBPORT,
    });

    await client.connect();

    for (const query of createTablesQueries) {
      await client.query(query);
    }
    await client.end();
  } catch (error) {
    console.error("Error creating tables:", error);
  }
})();
