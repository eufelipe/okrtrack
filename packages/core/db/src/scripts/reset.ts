import { sql } from "drizzle-orm";
import { execSync } from "child_process";

import { db, testConnection } from "../connection";
import { users } from "../schema";

async function resetDatabase() {
  console.log("🔄 Resetting database...\n");

  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("Database connection failed");
    }

    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);
    await db.execute(sql`TRUNCATE TABLE ${users}`);
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log("✅ Database reset completed!");

    if (process.env.NODE_ENV !== "production") {
      console.log("\n🌱 Auto-seeding after reset...");
      execSync("tsx src/seed.ts", { stdio: "inherit" });
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Reset failed:", error);
    process.exit(1);
  }
}

resetDatabase();
