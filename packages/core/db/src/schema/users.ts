import { uuidv7 } from "uuidv7";

import {
  boolean,
  index,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { sql } from "drizzle-orm";

export const TABLE_NAME = "users";

export const users = mysqlTable(
  TABLE_NAME,
  {
    // UUIDv7 como primary key - cronologicamente ordenado
    // No futuro migrar para PostgreSQL e usar o UUIDv7 nativo
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    email: varchar("email", { length: 191 }).notNull().unique(),

    passwordHash: varchar("password_hash", { length: 300 }),

    firstName: varchar("first_name", { length: 50 }).notNull(),
    lastName: varchar("last_name", { length: 50 }).notNull(),

    avatarUrl: varchar("avatar_url", { length: 2048 }),

    emailVerifiedAt: timestamp("email_verified_at"),

    // Soft delete
    isArchived: boolean("is_archived").notNull().default(false),
    archivedAt: timestamp("archived_at"),

    lastLoginAt: timestamp("last_login_at"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),

    emailActiveIdx: index("email_active_idx").on(table.email, table.isArchived),

    isArchivedIdx: index("is_archived_idx").on(table.isArchived),

    createdAtIdx: index("created_at_idx").on(table.createdAt),
  })
);

export type InsertUser = typeof users.$inferInsert;

export type SelectUser = typeof users.$inferSelect;

export type UpdateUser = Partial<Omit<InsertUser, "id">>;

export type CreateUserData = Omit<
  InsertUser,
  "id" | "createdAt" | "updatedAt" | "isArchived" | "archivedAt" | "lastLoginAt"
>;

export type PublicUser = Omit<
  SelectUser,
  "passwordHash" | "emailVerifiedAt" | "isArchived" | "archivedAt"
>;
