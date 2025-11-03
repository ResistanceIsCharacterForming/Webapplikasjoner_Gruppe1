import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";


export const sessions = sqliteTable("sessions", {
    id: int().primaryKey({ autoIncrement: true }),
    expiresAt:text().notNull(),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }).notNull(),
});

export type session = typeof sessions.$inferSelect;