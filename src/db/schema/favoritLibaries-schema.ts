import { date } from "drizzle-orm/mysql-core";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import {users} from "./users-schema";
import {libraries} from "./libaries-schema";


export const favoritLibraries = sqliteTable("favoritLibraries", {
    id: int().primaryKey({ autoIncrement: true }),
    userId:text("userId").references(() => users.id),
    libaryId:text("libaryId").references(() => libraries.id),
});

export type favoritLibrary = typeof favoritLibraries.$inferSelect;