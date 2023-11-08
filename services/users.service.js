import { USER_TABLE_NAME } from "../config/db.config.js";
import { pool } from "../db.js";

export async function getUserByGoogleId(id) {
  const user = await pool.query(
    `SELECT * FROM ${USER_TABLE_NAME} WHERE googleId=${id}`
  );
  return user;
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
  return user;
}