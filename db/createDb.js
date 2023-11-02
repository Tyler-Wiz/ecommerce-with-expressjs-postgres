const { Client } = require("pg");
const { PG } = require("../config");

(async () => {
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS users (
      id              INT         PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(50) UNIQUE  NOT NULL,      
      password        TEXT,
      name            VARCHAR(50)
    );`,
    `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
