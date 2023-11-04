module.exports = {
  PORT: process.env.PORT,
  PG: {
    DBUSER: process.env.DB_USER,
    DBHOST: process.env.DB_HOST,
    DBDATABASE: process.env.DB_DATABASE,
    DBPASSWORD: process.env.DB_PASSWORD,
    DBPORT: process.env.DB_PORT,
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
};
