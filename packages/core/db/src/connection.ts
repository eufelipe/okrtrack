import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema/index.js";
import type { PoolOptions } from "mysql2/promise";

const connectionConfig: PoolOptions = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "okrtrack",
  password: process.env.DB_PASSWORD || "okrtrack",
  database: process.env.DB_NAME || "okrtrack",
};

export const connection = mysql.createPool(connectionConfig);

export const db = drizzle(connection, { schema, mode: "default" });

export type Database = typeof db;

export async function closeConnection(): Promise<void> {
  await connection.end();
}

export async function testConnection(): Promise<boolean> {
  try {
    const conn = await connection.getConnection();
    await conn.ping();
    conn.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
