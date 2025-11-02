import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import {users} from "./users-schema";
import { randomUUID } from "node:crypto";


export const libraries = sqliteTable("libraries", {
  id: text().primaryKey().$defaultFn(() => randomUUID()),
  userId:text("userId").references(() => users.id, { onDelete: 'set null' }),
  name: text().notNull(),
  text: text().notNull(),
  cordlon: real().notNull(),
  cordlat: real().notNull(),
  books: text(),
  createdAt: text(),
  photos: text(),
});

export type library = typeof libraries.$inferSelect;