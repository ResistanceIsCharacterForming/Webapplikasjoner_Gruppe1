ALTER TABLE `rapport` RENAME TO `reports`;--> statement-breakpoint
ALTER TABLE `admins` RENAME COLUMN "admin_level" TO "adminLevel";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text,
	`libaryId` text,
	`reviewId` text,
	`rapportType` text NOT NULL,
	`rapportLevel` integer NOT NULL,
	`text` text,
	`createdAt` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`libaryId`) REFERENCES `libraries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_reports`("id", "userId", "libaryId", "reviewId", "rapportType", "rapportLevel", "text", "createdAt") SELECT "id", "userId", "libaryId", "reviewId", "rapportType", "rapportLevel", "text", "createdAt" FROM `reports`;--> statement-breakpoint
DROP TABLE `reports`;--> statement-breakpoint
ALTER TABLE `__new_reports` RENAME TO `reports`;--> statement-breakpoint
PRAGMA foreign_keys=ON;