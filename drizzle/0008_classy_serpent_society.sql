PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_libraries` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`name` text NOT NULL,
	`text` text NOT NULL,
	`cordlon` real NOT NULL,
	`cordlat` real NOT NULL,
	`books` text,
	`createdAt` text,
	`photos` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_libraries`("id", "userId", "name", "text", "cordlon", "cordlat", "books", "createdAt", "photos") SELECT "id", "userId", "name", "text", "cordlon", "cordlat", "books", "createdAt", "photos" FROM `libraries`;--> statement-breakpoint
DROP TABLE `libraries`;--> statement-breakpoint
ALTER TABLE `__new_libraries` RENAME TO `libraries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;