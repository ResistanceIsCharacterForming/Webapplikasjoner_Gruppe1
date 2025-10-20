// src/db/schema/user-schema.ts

import { date } from "drizzle-orm/mysql-core";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";


export const users = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(() => randomUUID()),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  settings: text(),
  createdAt: text(),
});

export type User = typeof users.$inferSelect;