import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./users-schema";
import { reviews } from "./reviews-schema";



export const reviewsEndorsements = sqliteTable("reviewsEndorsements", {
    id: int().primaryKey({ autoIncrement: true }),
    reviewId:int("reviewId").references(() => reviews.id,{ onDelete: 'cascade' }),
    userId:text("userId").references(() => users.id,{ onDelete: 'cascade' }),
    score:int().notNull(),
});

export type reviewEndorsement = typeof reviewsEndorsements.$inferSelect;