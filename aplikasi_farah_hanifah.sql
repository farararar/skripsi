-- --------------------------------------------------------
-- Host:                         newdemo.aplikasiskripsi.com
-- Server version:               5.7.31 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table aplikasi_farah_hanifah.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.accounts: ~2 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `reference_number`, `name`, `information`, `created_at`, `updated_at`) VALUES
	(1, 'AC/998270', 'Nama Akun 1', 'Deskripsi Akun 1', '2020-08-25 16:10:29', '2020-08-25 16:11:53'),
	(2, 'AC/998271', 'Edit Akun 2', 'Deskripsi Akun 2', '2020-08-25 16:10:45', '2020-08-25 16:12:28');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.customers: ~2 rows (approximately)
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` (`id`, `name`, `address`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Customer 1', 'address of customer number one', 'active', '2020-08-25 17:30:53', '2020-08-25 17:30:53'),
	(2, 'Customer 2', 'edited address of customer number two', 'active', '2020-08-25 17:31:04', '2020-08-25 17:36:01');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.incomes
CREATE TABLE IF NOT EXISTS `incomes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  `account_id` bigint(20) unsigned NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ammount` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `review_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewer_id` bigint(20) unsigned DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incomes_user_id_foreign` (`user_id`),
  KEY `incomes_account_id_foreign` (`account_id`),
  KEY `incomes_customer_id_foreign` (`customer_id`),
  KEY `incomes_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `incomes_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `incomes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `incomes_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `incomes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.incomes: ~3 rows (approximately)
/*!40000 ALTER TABLE `incomes` DISABLE KEYS */;
INSERT INTO `incomes` (`id`, `user_id`, `customer_id`, `account_id`, `invoice_number`, `ammount`, `description`, `payment_method`, `date`, `review_status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 1, 'INV/20200823/VIII/9989239', 500000.00, 'edited Deskripsi Pemasukan', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-08-25 17:41:52', '2020-08-25 17:44:58'),
	(2, 1, 2, 1, 'INV/20200823/VIII/9989245', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', 'Tidak ada kekurangan', 3, '2020-08-25 10:46:25', '2020-08-25 17:43:06', '2020-08-25 17:46:25');
/*!40000 ALTER TABLE `incomes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.journals
CREATE TABLE IF NOT EXISTS `journals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) unsigned NOT NULL,
  `debit` double(13,2) NOT NULL,
  `credit` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `review_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewer_id` bigint(20) unsigned DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journals_account_id_foreign` (`account_id`),
  KEY `journals_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `journals_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `journals_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.journals: ~2 rows (approximately)
/*!40000 ALTER TABLE `journals` DISABLE KEYS */;
INSERT INTO `journals` (`id`, `account_id`, `debit`, `credit`, `description`, `payment_method`, `date`, `review_status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`) VALUES
	(1, 1, 5000000.00, 0.00, 'Deskripsi Jurnal', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-08-25 18:01:40', '2020-08-25 18:04:40'),
	(2, 2, 0.00, 5000000.00, 'Deskripsi Jurnal', 'Cash', '2020-08-23', 'Tidak ada kekurangan', 3, '2020-08-25 11:06:02', '2020-08-25 18:01:46', '2020-08-25 18:06:02');
/*!40000 ALTER TABLE `journals` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.ledgers
CREATE TABLE IF NOT EXISTS `ledgers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) unsigned NOT NULL,
  `date` date NOT NULL,
  `debit` double(13,2) NOT NULL,
  `credit` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ledgers_account_id_foreign` (`account_id`),
  CONSTRAINT `ledgers_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.ledgers: ~2 rows (approximately)
/*!40000 ALTER TABLE `ledgers` DISABLE KEYS */;
INSERT INTO `ledgers` (`id`, `account_id`, `date`, `debit`, `credit`, `description`, `created_at`, `updated_at`) VALUES
	(1, 1, '2020-08-23', 5000000.00, 4500000.00, 'Deskripsi Buku Besar', '2020-08-25 17:12:06', '2020-08-25 17:12:06'),
	(2, 1, '2020-08-23', 4500000.00, 4500000.00, 'Edit Deskripsi Buku Besar', '2020-08-25 17:12:30', '2020-08-25 17:14:53');
/*!40000 ALTER TABLE `ledgers` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.migrations: ~9 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2020_08_12_064027_create_users_table', 1),
	(16, '2020_08_25_075703_create_accounts_table', 2),
	(17, '2020_08_25_075809_create_ledgers_table', 2),
	(18, '2020_08_25_080735_create_customers_table', 2),
	(19, '2020_08_25_080831_create_outcometypes_table', 2),
	(32, '2020_08_25_080836_create_outcomes_table', 3),
	(33, '2020_08_25_081013_create_journals_table', 3),
	(34, '2020_08_25_081130_create_incomes_table', 3),
	(35, '2020_08_25_081138_create_notifications_table', 3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.notifications: ~0 rows (approximately)
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.outcomes
CREATE TABLE IF NOT EXISTS `outcomes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `outcometype_id` bigint(20) unsigned NOT NULL,
  `account_id` bigint(20) unsigned NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ammount` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `review_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewer_id` bigint(20) unsigned DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `outcomes_user_id_foreign` (`user_id`),
  KEY `outcomes_account_id_foreign` (`account_id`),
  KEY `outcomes_outcometype_id_foreign` (`outcometype_id`),
  KEY `outcomes_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `outcomes_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outcomes_outcometype_id_foreign` FOREIGN KEY (`outcometype_id`) REFERENCES `outcometypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outcomes_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `outcomes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.outcomes: ~2 rows (approximately)
/*!40000 ALTER TABLE `outcomes` DISABLE KEYS */;
INSERT INTO `outcomes` (`id`, `user_id`, `outcometype_id`, `account_id`, `invoice_number`, `ammount`, `description`, `payment_method`, `date`, `review_status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 1, 'INV/20200823/VIII/9989237', 5000000.50, 'Deskripsi Pengeluaran', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-08-25 16:48:14', '2020-08-25 16:48:14'),
	(2, 2, 2, 1, 'INV/20200823/VIII/9989239', 500000.00, 'Deskripsi Pengeluaran', 'Cash', '2020-08-23', 'Tidak ada kekurangan', 3, '2020-08-25 09:57:23', '2020-08-25 16:48:25', '2020-08-25 16:57:23');
/*!40000 ALTER TABLE `outcomes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.outcometypes
CREATE TABLE IF NOT EXISTS `outcometypes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.outcometypes: ~2 rows (approximately)
/*!40000 ALTER TABLE `outcometypes` DISABLE KEYS */;
INSERT INTO `outcometypes` (`id`, `name`, `information`, `created_at`, `updated_at`) VALUES
	(1, 'Type 1', 'Type Description 1', '2020-08-25 16:22:39', '2020-08-25 16:22:39'),
	(2, 'Edit Type 2', 'Type Description 2', '2020-08-25 16:22:47', '2020-08-25 16:25:28');
/*!40000 ALTER TABLE `outcometypes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('Marketing','Operator','Accountant') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `level`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Marketing', 'marketing', 'marketing@gmail.com', NULL, '$2y$10$9869XJhyseq2Up/n5.dZT.e.eYp2LmSo.a41bTWSVDL8//bRQDO32', 'Marketing', NULL, '2020-08-12 14:46:59', '2020-08-12 14:46:59'),
	(2, 'Operator', 'operator', 'operator@gmail.com', NULL, '$2y$10$hwTuF0N3jc9/RcBcfQaGKeHyY39kIoWmkN8OiziQeWTB.A7.bnclK', 'Operator', NULL, '2020-08-12 14:46:59', '2020-08-12 14:46:59'),
	(3, 'Accountant', 'accountant', 'accountant@gmail.com', NULL, '$2y$10$SFtjOHF1ZVQ9lHZ1ugt4yOOpkT2eVXUjudFcrKakZD4CJSIsqC.52', 'Accountant', NULL, '2020-08-12 14:47:00', '2020-08-12 14:47:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
