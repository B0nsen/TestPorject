CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `T_Category` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_Category` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Filter` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_Filter` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Product` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Brand` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Color` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Price` double NOT NULL,
    `Weight` double NOT NULL,
    `Available` tinyint(1) NOT NULL,
    CONSTRAINT `PK_T_Product` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Role` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_Role` PRIMARY KEY (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `ProductCategory` (
    `ProductId` bigint NOT NULL,
    `CategoryId` bigint NOT NULL,
    CONSTRAINT `PK_ProductCategory` PRIMARY KEY (`CategoryId`, `ProductId`),
    CONSTRAINT `FK_ProductCategory_T_Category_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `T_Category` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_ProductCategory_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_FilterValue` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `ProductId` bigint NOT NULL,
    `FilterId` bigint NOT NULL,
    `Value` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_FilterValue` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_FilterValue_T_Filter_FilterId` FOREIGN KEY (`FilterId`) REFERENCES `T_Filter` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_T_FilterValue_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_ProductImage` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `ProductId` bigint NOT NULL,
    `ImageUrl` longtext CHARACTER SET utf8mb4 NOT NULL,
    `IsMain` tinyint(1) NOT NULL,
    `SortOrder` int NOT NULL,
    CONSTRAINT `PK_T_ProductImage` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_ProductImage_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_User` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Email` longtext CHARACTER SET utf8mb4 NOT NULL,
    `HashPassword` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Country` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Phone` longtext CHARACTER SET utf8mb4 NOT NULL,
    `RoleId` bigint NOT NULL,
    CONSTRAINT `PK_T_User` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_User_T_Role_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `T_Role` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Address` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `Country` longtext CHARACTER SET utf8mb4 NOT NULL,
    `City` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Street` longtext CHARACTER SET utf8mb4 NOT NULL,
    `PostalCode` longtext CHARACTER SET utf8mb4 NOT NULL,
    `HouseNumber` int NOT NULL,
    `IsDefault` tinyint(1) NOT NULL,
    `UserId` bigint NOT NULL,
    CONSTRAINT `PK_T_Address` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_Address_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_CartItem` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `UserId` bigint NOT NULL,
    `ProductId` bigint NOT NULL,
    `Quantity` int NOT NULL,
    CONSTRAINT `PK_T_CartItem` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_CartItem_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_T_CartItem_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_CreditCard` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `CardNumber` longtext CHARACTER SET utf8mb4 NOT NULL,
    `HolderName` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Expiry` datetime(6) NOT NULL,
    `Cvv` int NOT NULL,
    `UserId` bigint NOT NULL,
    CONSTRAINT `PK_T_CreditCard` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_CreditCard_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Order` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `OrderDate` datetime(6) NOT NULL,
    `UserId` bigint NULL,
    CONSTRAINT `PK_T_Order` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_Order_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Review` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `ProductId` bigint NULL,
    `UserId` bigint NULL,
    CONSTRAINT `PK_T_Review` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_Review_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`),
    CONSTRAINT `FK_T_Review_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_Wishlist` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `UserId` bigint NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_Wishlist` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_Wishlist_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `T_OrderItem` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `OrderId` bigint NOT NULL,
    `ProductId` bigint NOT NULL,
    `Quantity` int NOT NULL,
    CONSTRAINT `PK_T_OrderItem` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_OrderItem_T_Order_OrderId` FOREIGN KEY (`OrderId`) REFERENCES `T_Order` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_T_OrderItem_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE TABLE `WishlistItem` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `ProductId` bigint NOT NULL,
    `WishlistId` bigint NOT NULL,
    CONSTRAINT `PK_WishlistItem` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_WishlistItem_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_WishlistItem_T_Wishlist_WishlistId` FOREIGN KEY (`WishlistId`) REFERENCES `T_Wishlist` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_ProductCategory_ProductId` ON `ProductCategory` (`ProductId`);

CREATE INDEX `IX_T_Address_UserId` ON `T_Address` (`UserId`);

CREATE INDEX `IX_T_CartItem_ProductId` ON `T_CartItem` (`ProductId`);

CREATE INDEX `IX_T_CartItem_UserId` ON `T_CartItem` (`UserId`);

CREATE INDEX `IX_T_CreditCard_UserId` ON `T_CreditCard` (`UserId`);

CREATE INDEX `IX_T_FilterValue_FilterId` ON `T_FilterValue` (`FilterId`);

CREATE INDEX `IX_T_FilterValue_ProductId` ON `T_FilterValue` (`ProductId`);

CREATE INDEX `IX_T_Order_UserId` ON `T_Order` (`UserId`);

CREATE INDEX `IX_T_OrderItem_OrderId` ON `T_OrderItem` (`OrderId`);

CREATE INDEX `IX_T_OrderItem_ProductId` ON `T_OrderItem` (`ProductId`);

CREATE INDEX `IX_T_ProductImage_ProductId` ON `T_ProductImage` (`ProductId`);

CREATE INDEX `IX_T_Review_ProductId` ON `T_Review` (`ProductId`);

CREATE INDEX `IX_T_Review_UserId` ON `T_Review` (`UserId`);

CREATE INDEX `IX_T_User_RoleId` ON `T_User` (`RoleId`);

CREATE INDEX `IX_T_Wishlist_UserId` ON `T_Wishlist` (`UserId`);

CREATE INDEX `IX_WishlistItem_ProductId` ON `WishlistItem` (`ProductId`);

CREATE INDEX `IX_WishlistItem_WishlistId` ON `WishlistItem` (`WishlistId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260316141347_InitialCreate', '8.0.25');

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS `POMELO_BEFORE_DROP_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID TINYINT(1);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `Extra` = 'auto_increment'
			AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `POMELO_AFTER_ADD_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255), IN `COLUMN_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID INT(11);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
			AND `COLUMN_TYPE` LIKE '%int%'
			AND `COLUMN_KEY` = 'PRI';
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL AUTO_INCREMENT;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

ALTER TABLE `WishlistItem` DROP FOREIGN KEY `FK_WishlistItem_T_Product_ProductId`;

ALTER TABLE `WishlistItem` DROP FOREIGN KEY `FK_WishlistItem_T_Wishlist_WishlistId`;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'WishlistItem');
ALTER TABLE `WishlistItem` DROP PRIMARY KEY;

ALTER TABLE `WishlistItem` RENAME `T_WishlistItem`;

ALTER TABLE `T_WishlistItem` RENAME INDEX `IX_WishlistItem_WishlistId` TO `IX_T_WishlistItem_WishlistId`;

ALTER TABLE `T_WishlistItem` RENAME INDEX `IX_WishlistItem_ProductId` TO `IX_T_WishlistItem_ProductId`;

ALTER TABLE `T_WishlistItem` ADD CONSTRAINT `PK_T_WishlistItem` PRIMARY KEY (`Id`);
CALL POMELO_AFTER_ADD_PRIMARY_KEY(NULL, 'T_WishlistItem', 'Id');

ALTER TABLE `T_WishlistItem` ADD CONSTRAINT `FK_T_WishlistItem_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE;

ALTER TABLE `T_WishlistItem` ADD CONSTRAINT `FK_T_WishlistItem_T_Wishlist_WishlistId` FOREIGN KEY (`WishlistId`) REFERENCES `T_Wishlist` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260316141711_SecondMigration', '8.0.25');

DROP PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`;

DROP PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`;

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Review` DROP FOREIGN KEY `FK_T_Review_T_Product_ProductId`;

ALTER TABLE `T_Review` DROP FOREIGN KEY `FK_T_Review_T_User_UserId`;

ALTER TABLE `T_Review` MODIFY COLUMN `UserId` bigint NOT NULL DEFAULT 0;

ALTER TABLE `T_Review` MODIFY COLUMN `ProductId` bigint NOT NULL DEFAULT 0;

ALTER TABLE `T_Review` ADD `Comment` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `T_Review` ADD `CreatedAt` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00';

ALTER TABLE `T_Review` ADD `Rating` int NOT NULL DEFAULT 0;

ALTER TABLE `T_Product` MODIFY COLUMN `Weight` double NULL;

ALTER TABLE `T_Product` MODIFY COLUMN `Color` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_Product` MODIFY COLUMN `Brand` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_Product` ADD `Sale` int NULL;

ALTER TABLE `T_Review` ADD CONSTRAINT `FK_T_Review_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE;

ALTER TABLE `T_Review` ADD CONSTRAINT `FK_T_Review_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260329170630_ThirdMigration', '8.0.25');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260329171921_FourthMigration', '8.0.25');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260330143254_FifthMigration', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_ProductImage` ADD `FileName` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260330152307_SixthMigration', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_User` ADD `Salt` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260406102937_AddSaltToUsers', '8.0.25');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260406112904_AddDefaultRoleToUser', '8.0.25');

COMMIT;

START TRANSACTION;

INSERT INTO `T_Role` (`Id`, `Name`)
VALUES (1, 'User'),
(2, 'Admin'),
(3, 'SuperAdmin');

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260406113230_SeedRoles', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Product` ADD `Description` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260409074344_LocalMigration', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Review` ADD `Title` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260420075511_UpdatedReview', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_CartItem` DROP FOREIGN KEY `FK_T_CartItem_T_User_UserId`;

ALTER TABLE `T_CartItem` DROP INDEX `IX_T_CartItem_UserId`;

ALTER TABLE `T_User` MODIFY COLUMN `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `T_User` ADD `AvatarUrl` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `T_User` ADD `DateOfBirth` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00';

ALTER TABLE `T_User` ADD `FileName` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `T_Review` ADD `Helpful` int NOT NULL DEFAULT 0;

CREATE TABLE `T_ReviewImages` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `ReviewId` bigint NOT NULL,
    `ImageUrl` longtext CHARACTER SET utf8mb4 NOT NULL,
    `FileName` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_T_ReviewImages` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_ReviewImages_T_Review_ReviewId` FOREIGN KEY (`ReviewId`) REFERENCES `T_Review` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE UNIQUE INDEX `IX_T_User_Email` ON `T_User` (`Email`);

CREATE UNIQUE INDEX `IX_T_CartItem_UserId_ProductId` ON `T_CartItem` (`UserId`, `ProductId`);

CREATE INDEX `IX_T_ReviewImages_ReviewId` ON `T_ReviewImages` (`ReviewId`);

ALTER TABLE `T_CartItem` ADD CONSTRAINT `FK_T_CartItem_T_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_Users` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260428090133_AddedMissingValues', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_User` MODIFY COLUMN `Phone` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_User` MODIFY COLUMN `FileName` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_User` MODIFY COLUMN `Country` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_User` MODIFY COLUMN `AvatarUrl` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260428092345_MadeUserValuesNullable', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Review` DROP FOREIGN KEY `FK_T_Review_T_User_UserId`;

CREATE TABLE `ReviewUser` (
    `ReviewId` bigint NOT NULL,
    `UsersLikedId` bigint NOT NULL,
    CONSTRAINT `PK_ReviewUser` PRIMARY KEY (`ReviewId`, `UsersLikedId`),
    CONSTRAINT `FK_ReviewUser_T_Review_ReviewId` FOREIGN KEY (`ReviewId`) REFERENCES `T_Review` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_ReviewUser_T_User_UsersLikedId` FOREIGN KEY (`UsersLikedId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_ReviewUser_UsersLikedId` ON `ReviewUser` (`UsersLikedId`);

ALTER TABLE `T_Review` ADD CONSTRAINT `FK_T_Review_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE RESTRICT;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260429093856_AddedUsersLikedToReview', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Product` ADD `MaxQuantity` int NOT NULL DEFAULT 0;

ALTER TABLE `T_Product` ADD `Metadata` json NOT NULL;

ALTER TABLE `T_Product` ADD `Warranty` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260501073505_AddedMissingVariablesToProduct', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Product` DROP COLUMN `Brand`;

ALTER TABLE `T_Product` DROP COLUMN `Color`;

ALTER TABLE `T_Product` DROP COLUMN `Weight`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260501080522_RemovedUnnecessaryVariablesFromProduct', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Product` ADD `Brand` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `T_Product` ADD `Condition` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260511090433_ProductModifications', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Review` ADD `Verified` tinyint(1) NOT NULL DEFAULT FALSE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260518092358_AddedVerifiedToReviews', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Category` ADD `FileName` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `T_Category` ADD `ImageUrl` longtext CHARACTER SET utf8mb4 NULL;

CREATE TABLE `PasswordResetTokens` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `UserId` bigint NOT NULL,
    `TokenHash` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ExpiresAt` datetime(6) NOT NULL,
    `UsedAt` datetime(6) NULL,
    `CreatedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_PasswordResetTokens` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PasswordResetTokens_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_PasswordResetTokens_UserId` ON `PasswordResetTokens` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260523113203_AddedNewFields', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_User` ADD `EmailConfirmed` tinyint(1) NOT NULL DEFAULT FALSE;

ALTER TABLE `T_User` ADD `EmailConfirmedAt` datetime(6) NULL;

CREATE TABLE `T_EmailConfirmationToken` (
    `Id` bigint NOT NULL AUTO_INCREMENT,
    `UserId` bigint NOT NULL,
    `TokenHash` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ExpiresAt` datetime(6) NOT NULL,
    `UsedAt` datetime(6) NULL,
    `CreatedAt` datetime(6) NOT NULL,
    CONSTRAINT `PK_T_EmailConfirmationToken` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_T_EmailConfirmationToken_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_T_EmailConfirmationToken_UserId` ON `T_EmailConfirmationToken` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260524171654_AddPasswordResetTokens', '8.0.25');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260525092525_EmailUpdate', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Product` ADD `ManufacturerBanner` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260530110546_SmallChanges', '8.0.25');

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS `POMELO_BEFORE_DROP_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID TINYINT(1);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `Extra` = 'auto_increment'
			AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `POMELO_AFTER_ADD_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255), IN `COLUMN_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID INT(11);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
			AND `COLUMN_TYPE` LIKE '%int%'
			AND `COLUMN_KEY` = 'PRI';
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL AUTO_INCREMENT;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

ALTER TABLE `ProductCategory` DROP FOREIGN KEY `FK_ProductCategory_T_Category_CategoryId`;

ALTER TABLE `ProductCategory` DROP FOREIGN KEY `FK_ProductCategory_T_Product_ProductId`;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'ProductCategory');
ALTER TABLE `ProductCategory` DROP PRIMARY KEY;

ALTER TABLE `ProductCategory` RENAME `T_ProductCategory`;

ALTER TABLE `T_ProductCategory` RENAME INDEX `IX_ProductCategory_ProductId` TO `IX_T_ProductCategory_ProductId`;

ALTER TABLE `T_ProductCategory` ADD CONSTRAINT `PK_T_ProductCategory` PRIMARY KEY (`CategoryId`, `ProductId`);

ALTER TABLE `T_ProductCategory` ADD CONSTRAINT `FK_T_ProductCategory_T_Category_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `T_Category` (`Id`) ON DELETE CASCADE;

ALTER TABLE `T_ProductCategory` ADD CONSTRAINT `FK_T_ProductCategory_T_Product_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `T_Product` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260605092309_changes', '8.0.25');

DROP PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`;

DROP PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`;

COMMIT;

START TRANSACTION;

DROP TABLE `T_FilterValue`;

DROP TABLE `T_Filter`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260611175954_removedTables', '8.0.25');

COMMIT;

START TRANSACTION;

ALTER TABLE `T_Review` DROP FOREIGN KEY `FK_T_Review_T_User_UserId`;

ALTER TABLE `T_Review` ADD CONSTRAINT `FK_T_Review_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260618131136_changedbehaviour', '8.0.25');

COMMIT;

