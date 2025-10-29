ALTER TABLE `reviewUsefullness` RENAME TO `reviewsEndorsements`;--> statement-breakpoint
ALTER TABLE `libraries` RENAME COLUMN "cordinats" TO "cordlon";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reviewsEndorsements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reviewId` integer,
	`userId` text,
	`score` integer NOT NULL,
	FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reviewsEndorsements`("id", "reviewId", "userId", "score") SELECT "id", "reviewId", "userId", "score" FROM `reviewsEndorsements`;--> statement-breakpoint
DROP TABLE `reviewsEndorsements`;--> statement-breakpoint
ALTER TABLE `__new_reviewsEndorsements` RENAME TO `reviewsEndorsements`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `libraries` ADD `cordlat` text NOT NULL;