import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import {users} from "./users-schema";


export const admins = sqliteTable("admins", {
  userId:text("userId").references(() => users.id).primaryKey(),
  adminLevel: int().notNull(),
  createdAt: text().notNull(),
});

export type admin = typeof admins.$inferSelect;