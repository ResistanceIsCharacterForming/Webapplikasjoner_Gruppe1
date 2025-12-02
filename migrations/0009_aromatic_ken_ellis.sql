CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`expiresAt` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favoritLibraries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`libaryId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libaryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_favoritLibraries`("id", "userId", "libaryId") SELECT "id", "userId", "libaryId" FROM `favoritLibraries`;--> statement-breakpoint
DROP TABLE `favoritLibraries`;--> statement-breakpoint
ALTER TABLE `__new_favoritLibraries` RENAME TO `favoritLibraries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`libaryId` text NOT NULL,
	`text` text,
	`reviewsPoints` integer,
	`createdAt` text,
	`Photo` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`libaryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "userId", "libaryId", "text", "reviewsPoints", "createdAt", "Photo") SELECT "id", "userId", "libaryId", "text", "reviewsPoints", "createdAt", "Photo" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
CREATE TABLE `__new_reviewsEndorsements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reviewId` integer NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reviewsEndorsements`("id", "reviewId", "userId") SELECT "id", "reviewId", "userId" FROM `reviewsEndorsements`;--> statement-breakpoint
DROP TABLE `reviewsEndorsements`;--> statement-breakpoint
ALTER TABLE `__new_reviewsEndorsements` RENAME TO `reviewsEndorsements`;--> statement-breakpoint
ALTER TABLE `users` ADD `lastLoginAt` text;--> statement-breakpoint
ALTER TABLE `users` ADD `is_visible` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `libraries` ADD `isvisible` integer NOT NULL;