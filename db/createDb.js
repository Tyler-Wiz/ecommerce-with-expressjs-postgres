const { Client } = require("pg");
const { PG } = require("../config");

(async () => {
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS users (
      id              SERIAL         PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,,
      email           VARCHAR(50) UNIQUE  NOT NULL,      
      password        TEXT,
      firstName       VARCHAR(50),
      lastName        VARCHAR(50),
      google          JSON,
      facebook        JSON 
    );`,
    ` CREATE TABLE IF NOT EXISTS products (
      id             SERIAL             PRIMARY KEY,
      name            VARCHAR(50)     NOT NULL,
      price           BIGINT          NOT NULL,
      description     VARCHAR(50)     NOT NULL
    );`,
    `
    CREATE TABLE IF NOT EXISTS orders (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      total           INT             NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userId          INT             NOT NULL,
      created         DATE            NOT NULL,
      modified        DATE            NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );`,
    ` CREATE TABLE IF NOT EXISTS orderItems (
      id             SERIAL             PRIMARY KEY,
      created         DATE            NOT NULL,
      orderId         INT             NOT NULL,
      qty             INT             NOT NULL,
      price           INT             NOT NULL,
      productId       INT             NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    );
  `,
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
