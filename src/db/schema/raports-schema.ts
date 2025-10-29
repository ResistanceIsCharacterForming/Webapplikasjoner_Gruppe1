import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { libraries } from "./libaries-schema";
import { reviews } from "./reviews-schema";


export const reports = sqliteTable("reports", {
    id: int().primaryKey({ autoIncrement: true }),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }),
    libaryId:text("libaryId").references(() => libraries.id,{ onDelete: 'cascade' }),
    reviewId:text("reviewId").references(() => reviews.id,{ onDelete: 'cascade' }),
    raportType: text().notNull(),
    raportLevel: int().notNull(),
    text: text(),
    createdAt: text(),

});

export type report = typeof reports.$inferSelect;