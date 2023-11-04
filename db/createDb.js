const { Client } = require("pg");
const { PG } = require("../config");

(async () => {
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS users (
    id               SERIAL PRIMARY KEY,
    username         VARCHAR(50) NOT NULL,
    email            VARCHAR(100) UNIQUE NOT NULL,
    password         VARCHAR(255) NOT NULL,
    first_name       VARCHAR(50),
    last_name        VARCHAR(50),
    date_of_birth    DATE,
    address          VARCHAR(255),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS products (
      id               SERIAL PRIMARY KEY,
      name             VARCHAR(255) NOT NULL,
      description      TEXT,
      price            DECIMAL(10, 2)   NOT NULL,
      category         VARCHAR(100),
      updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
