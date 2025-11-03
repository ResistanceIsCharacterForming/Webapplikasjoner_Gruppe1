import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import {users} from "./users-schema";
import {libraries} from "./libaries-schema";


export const favoritLibraries = sqliteTable("favoritLibraries", {
    id: int().primaryKey({ autoIncrement: true }),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }).notNull(),
    libaryId:text("libaryId").references(() => libraries.id,{ onDelete: 'cascade' }).notNull(),
});

export type favoritLibrary = typeof favoritLibraries.$inferSelect;