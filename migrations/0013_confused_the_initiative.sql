ALTER TABLE `favoritLibraries` RENAME TO `favoriteLibraries`;--> statement-breakpoint
ALTER TABLE `favoriteLibraries` RENAME COLUMN "libaryId" TO "libraryId";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favoriteLibraries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`libraryId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_favoriteLibraries`("id", "userId", "libraryId") SELECT "id", "userId", "libraryId" FROM `favoriteLibraries`;--> statement-breakpoint
DROP TABLE `favoriteLibraries`;--> statement-breakpoint
ALTER TABLE `__new_favoriteLibraries` RENAME TO `favoriteLibraries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`libraryId` text NOT NULL,
	`text` text,
	`reviewsPoints` integer,
	`createdAt` text,
	`photo` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "userId", "libraryId", "text", "reviewsPoints", "createdAt", "photo") SELECT "id", "userId", "libraryId", "text", "reviewsPoints", "createdAt", "photo" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
CREATE TABLE `__new_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submitterUserId` text NOT NULL,
	`userId` text,
	`libraryId` text,
	`reviewId` integer,
	`reportType` text NOT NULL,
	`reportLevel` integer NOT NULL,
	`text` text,
	`createdAt` text NOT NULL,
	FOREIGN KEY (`submitterUserId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reports`("id", "submitterUserId", "userId", "libraryId", "reviewId", "reportType", "reportLevel", "text", "createdAt") SELECT "id", "submitterUserId", "userId", "libraryId", "reviewId", "reportType", "reportLevel", "text", "createdAt" FROM `reports`;--> statement-breakpoint
DROP TABLE `reports`;--> statement-breakpoint
ALTER TABLE `__new_reports` RENAME TO `reports`;