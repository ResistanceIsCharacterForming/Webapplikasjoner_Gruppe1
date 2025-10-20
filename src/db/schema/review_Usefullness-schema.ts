import { date } from "drizzle-orm/mysql-core";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { reviews } from "./reviews-schema";


export const reviewUsefullness = sqliteTable("reviewUsefullness", {
    id: int().primaryKey({ autoIncrement: true }),
    reviewId:int("reviewId").references(() => reviews.id),
    userId:text("userId").references(() => users.id),
});

export type reviewUsefull = typeof reviewUsefullness.$inferSelect;