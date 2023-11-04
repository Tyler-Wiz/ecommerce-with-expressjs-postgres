const Pool = require("pg").Pool;
const { PG } = require("../config");

const pool = new Pool({
  user: PG.DBUSER,
  host: PG.DBHOST,
  database: PG.DBDATABASE,
  password: PG.DBPASSWORD,
  port: PG.DBPORT,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = { query };
