import pool from "../config/db";

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export const createUser = async (user: User): Promise<User> => {
  const { username, email, password } = user;
  const result = await pool.query(
    "INSERT INTO users (username, email, password, createdAt) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
};
