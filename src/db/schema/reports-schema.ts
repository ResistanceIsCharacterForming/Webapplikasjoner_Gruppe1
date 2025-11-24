import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { libraries } from "./libraries-schema";
import { reviews } from "./reviews-schema";


export const reports = sqliteTable("reports", {
    id: int().primaryKey({ autoIncrement: true }),
    submitterUserId:text("submitterUserId").references(() => users.id,{ onDelete: 'cascade' }).notNull(),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }),
    libraryId:text("libraryId").references(() => libraries.id,{ onDelete: 'cascade' }),
    reviewId:int("reviewId").references(() => reviews.id,{ onDelete: 'cascade' }),
    reportType: text().notNull(),
    reportLevel: int().notNull(),
    text: text(),
    createdAt: text().notNull(),

});

export type report = typeof reports.$inferSelect;