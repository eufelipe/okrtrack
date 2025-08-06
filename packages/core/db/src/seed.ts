import { closeConnection, db, testConnection } from "./connection";
import { seedUsers } from "./seeders/users-seeder";

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("Database connection failed");
    }
    console.log("✅ Database connected\n");

    await seedUsers(db);

    console.log("\n🎉 Seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await closeConnection();
    console.log("✅ Database connection closed");
    process.exit(0);
  }
}

main();
