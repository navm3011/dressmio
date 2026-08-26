CREATE TABLE `surveyFeedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`appRating` int NOT NULL,
	`usageFrequency` varchar(50) NOT NULL,
	`likedFeatures` text,
	`dislikedFeatures` text,
	`improvementSuggestions` text,
	`generalFeedback` text,
	`wouldRecommend` int,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `surveyFeedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `surveyTracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`appInstallDate` timestamp NOT NULL DEFAULT (now()),
	`lastSurveyPromptAt` timestamp,
	`completedAt` timestamp,
	`isCompleted` int NOT NULL DEFAULT 0,
	`promptCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `surveyTracking_id` PRIMARY KEY(`id`)
);
