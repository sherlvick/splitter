import { USER_TABLE_NAME } from "../config/db.config.js";
import { pool } from "../server.js";

export async function getUserByGoogleId(id) {
  const [userArr] = await pool.query({
    sql: `SELECT * FROM ${USER_TABLE_NAME} WHERE googleId=${id}`,
    rowsAsArray: false,
  });
  if (userArr && userArr.length) return userArr[0];
  return null;
}

export async function createUser({
  googleId,
  displayName,
  firstName,
  lastName,
  image,
  email,
}) {
  const user = await pool.query(
    `INSERT INTO ${USER_TABLE_NAME}
  VALUES (?, ?, ?, ?, ?, ?)`,
    [googleId, displayName, firstName, lastName, image, email]
  );
  console.log("user1", user);
  return user;
}
