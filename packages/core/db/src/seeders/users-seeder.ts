import { faker } from "@faker-js/faker";

import type { Database } from "../connection";
import { users } from "../schema";

const USER_CONFIG = {
  development: { count: 20, includeFixed: true },
  production: { count: 0, includeFixed: false },
  test: { count: 5, includeFixed: false },
};

const PASSWORD_HASH =
  "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewKKjzs.J4c9BQWO";

const FIXED_USERS = [
  {
    email: "contato@eufelipe.com",
    passwordHash: PASSWORD_HASH,
    firstName: "Felipe",
    lastName: "Rosas",
    avatarUrl: "https://github.com/eufelipe.png",
    emailVerifiedAt: new Date(),
  },
];

export async function seedUsers(db: Database, skipExisting: boolean = true) {
  const existingUsers = await db.$count(users);
  if (existingUsers > 0 && skipExisting) {
    console.log("⚠️  Database already has data, skipping seed");
    return;
  }

  const environment = (process.env.NODE_ENV ||
    "development") as keyof typeof USER_CONFIG;
  const config = USER_CONFIG[environment];

  console.log(`👥 Seeding users for ${environment}...`);

  if (config.includeFixed || environment === "production") {
    await db.insert(users).values(FIXED_USERS);
    console.log(`  ✅ Inserted ${FIXED_USERS.length} fixed users`);
  }

  if (config.count > 0) {
    if (environment === "test") {
      faker.seed(12345);
    }

    const randomUsers = Array.from({ length: config.count }, () => ({
      email: faker.internet.email(),
      passwordHash: PASSWORD_HASH,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatarUrl: faker.helpers.maybe(
        () =>
          `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1700000000000 })}?w=150&h=150&fit=crop&crop=face`,
        { probability: 0.6 }
      ),
      emailVerifiedAt: faker.helpers.maybe(() => faker.date.past(), {
        probability: 0.8,
      }),
    }));

    await db.insert(users).values(randomUsers);
    console.log(`  ✅ Generated ${config.count} random users`);
  }

  const totalUsers = await db.$count(users);
  console.log(`  📊 Total users: ${totalUsers}`);

  if (environment === "development") {
    console.log(`  🔑 Login: contato@eufelipe.com / (use your password)`);
  }
}
