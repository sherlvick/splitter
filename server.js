import express from 'express';
import mysql from 'mysql2';
import session from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import 'dotenv/config';

const mysqlStore = expressMysqlSession(session);

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
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  pool
);

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: 'splitter',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(passport.authenticate('session'));

/*  PASSPORT SETUP  */
// const passport = require("passport");
import passport from 'passport';
import passportConfig from './config/passport.config.js';
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

// /*  ROUTES  */
import mainRouter from './routes/index.js';
app.use(mainRouter);

sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch((error) => {
    // Something went wrong.
    console.error(error);
  });
