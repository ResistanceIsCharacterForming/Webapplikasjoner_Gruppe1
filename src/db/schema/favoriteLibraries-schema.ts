import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { libraries } from "./libraries-schema";


export const favoriteLibraries = sqliteTable("favoriteLibraries", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text("userId").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    libraryId: text("libraryId").references(() => libraries.id, { onDelete: 'cascade' }).notNull(),
});

