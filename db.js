import mysql from "mysql2";
import mysqlStore from "express-mysql-session";
import dotenv from "dotenv";

// config will read your .env file, parse the contents, assign it to process.env
dotenv.config();

// Create a MySQL connection pool
export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Configure session store using express-mysql-session
export const sessionStore = new mysqlStore(
  {
    checkExpirationInterval: 900000, // How frequently expired sessions will be cleared in milliseconds (15 minutes)
    expiration: 86400000, // The maximum age (in milliseconds) of a valid session (1 day)
    createDatabaseTable: true, // Whether or not to create the sessions database table, default is true
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  pool
);
