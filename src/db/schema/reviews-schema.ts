import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import {users} from "./users-schema";
import {libraries} from "./libaries-schema";


export const reviews = sqliteTable("reviews", {
    id: int().primaryKey({ autoIncrement: true }),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }),
    libaryId:text("libaryId").references(() => libraries.id,{ onDelete: 'cascade' }),
    text: text(),
    reviewsPoints: int(),
    createdAt: text(),
    Photo: text(),
});

export type review = typeof reviews.$inferSelect;