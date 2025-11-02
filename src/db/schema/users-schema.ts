import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";


export const users = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(() => randomUUID()),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  settings: text(),
  createdAt: text(),
  lastLoginAt: text(),
  profileImage: text(),
  isActive: int('is_active', { mode: 'boolean' }).notNull(),
});

export type User = typeof users.$inferSelect;