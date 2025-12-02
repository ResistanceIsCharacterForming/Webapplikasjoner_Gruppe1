PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favoritLibraries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text,
	`libaryId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libaryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_favoritLibraries`("id", "userId", "libaryId") SELECT "id", "userId", "libaryId" FROM `favoritLibraries`;--> statement-breakpoint
DROP TABLE `favoritLibraries`;--> statement-breakpoint
ALTER TABLE `__new_favoritLibraries` RENAME TO `favoritLibraries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_libraries` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`name` text NOT NULL,
	`text` text NOT NULL,
	`cordlon` text NOT NULL,
	`cordlat` text NOT NULL,
	`books` text,
	`createdAt` text,
	`photos` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_libraries`("id", "userId", "name", "text", "cordlon", "cordlat", "books", "createdAt", "photos") SELECT "id", "userId", "name", "text", "cordlon", "cordlat", "books", "createdAt", "photos" FROM `libraries`;--> statement-breakpoint
DROP TABLE `libraries`;--> statement-breakpoint
ALTER TABLE `__new_libraries` RENAME TO `libraries`;--> statement-breakpoint
CREATE TABLE `__new_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text,
	`libaryId` text,
	`reviewId` text,
	`raportType` text NOT NULL,
	`raportLevel` integer NOT NULL,
	`text` text,
	`createdAt` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libaryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reports`("id", "userId", "libaryId", "reviewId", "raportType", "raportLevel", "text", "createdAt") SELECT "id", "userId", "libaryId", "reviewId", "raportType", "raportLevel", "text", "createdAt" FROM `reports`;--> statement-breakpoint
DROP TABLE `reports`;--> statement-breakpoint
ALTER TABLE `__new_reports` RENAME TO `reports`;