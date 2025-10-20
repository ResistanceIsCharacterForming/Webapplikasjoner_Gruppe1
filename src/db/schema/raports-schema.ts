import { date } from "drizzle-orm/mysql-core";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { libraries } from "./libaries-schema";
import { reviews } from "./reviews-schema";


export const reports = sqliteTable("reports", {
    id: int().primaryKey({ autoIncrement: true }),
    userId:text("userId").references(() => users.id),
    libaryId:text("libaryId").references(() => libraries.id),
    reviewId:text("reviewId").references(() => reviews.id),
    raportType: text().notNull(),
    raportLevel: int().notNull(),
    text: text(),
    createdAt: text(),

});

export type report = typeof reports.$inferSelect;