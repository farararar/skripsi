-- --------------------------------------------------------
-- Host:                         newdemo.aplikasiskripsi.com
-- Server version:               10.3.24-MariaDB-cll-lve - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for aplikasi_farah_hanifah
CREATE DATABASE IF NOT EXISTS `aplikasi_farah_hanifah` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `aplikasi_farah_hanifah`;

-- Dumping structure for table aplikasi_farah_hanifah.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.accounts: ~6 rows (approximately)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `reference_number`, `name`, `information`, `created_at`, `updated_at`) VALUES
	(1, '10001', 'Kas', 'Deskripsi Akun 1', '2020-08-25 16:10:29', '2020-08-25 16:11:53'),
	(2, '10002', 'Pendapatan Produk', 'Deskripsi Akun 2', '2020-08-25 16:10:45', '2020-09-21 13:31:48'),
	(4, '10004', 'Piutang Usaha', '-', NULL, NULL),
	(5, '10005', 'Retur Penjualan', 'Deskripsi Akun 3', '2020-09-21 13:31:44', '2020-09-21 13:31:44'),
	(6, '10003', 'Uang Muka Penjualan', '-', NULL, NULL),
	(7, '10006', 'Beban', '-', NULL, NULL),
	(8, '10007', 'Utang Usaha', '-', NULL, NULL);
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
DELETE FROM `customers`;
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
  `product_id` bigint(20) unsigned NOT NULL,
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
  `unit` int(11) NOT NULL DEFAULT 0,
  `unit_price` double(13,2) NOT NULL DEFAULT 0.00,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incomes_user_id_foreign` (`user_id`),
  KEY `incomes_account_id_foreign` (`account_id`),
  KEY `incomes_customer_id_foreign` (`customer_id`),
  KEY `incomes_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `incomes_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `incomes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `incomes_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `incomes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.incomes: ~15 rows (approximately)
DELETE FROM `incomes`;
/*!40000 ALTER TABLE `incomes` DISABLE KEYS */;
INSERT INTO `incomes` (`id`, `user_id`, `customer_id`, `account_id`, `product_id`, `invoice_number`, `ammount`, `description`, `payment_method`, `date`, `review_status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`, `unit`, `unit_price`, `information`) VALUES
	(1, 1, 1, 1, 0, 'INV/20200823/VIII/9989239', 500000.00, 'edited Deskripsi Pemasukan', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-08-25 17:41:52', '2020-08-25 17:44:58', 0, 0.00, NULL),
	(2, 1, 2, 1, 0, 'INV/20200823/VIII/9989245', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', 'approved', 3, '2020-08-31 04:30:38', '2020-08-25 17:43:06', '2020-08-31 11:30:38', 0, 0.00, NULL),
	(19, 1, 2, 1, 0, 'INV/20200823/VIII/002', 450000.00, 'Penjualan Roti 3 Pack', 'Cash', '2020-08-28', NULL, NULL, NULL, '2020-08-28 13:26:11', '2020-08-28 13:26:11', 3, 150000.00, 'Pembayaran dilakukan di outlet'),
	(20, 1, 1, 1, 0, 'INV/20200823/VIII/003', 450000.00, 'Penjualan Roti Tawar 10 Pack', 'Cash', '2020-08-25', 'rejected', 3, '2020-09-09 06:40:19', '2020-08-28 13:38:35', '2020-09-09 13:40:19', 10, 45000.00, 'Penjualan Outlet'),
	(21, 1, 2, 1, 0, 'INV/20200823/VIII/9989245', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', 'approved', 3, '2020-08-31 05:11:03', '2020-08-28 13:40:05', '2020-08-31 12:11:03', 2, 250000.00, 'Informasi pemasukan'),
	(22, 1, 2, 1, 0, 'INV/20200823/VIII/1989445', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', 'rejected', 3, '2020-09-09 06:40:52', '2020-09-01 15:14:43', '2020-09-09 13:40:52', 2, 250000.00, 'Informasi pemasukan'),
	(23, 1, 2, 1, 0, 'INV/20200823/VIII/1989462', 1000000.00, 'Penjulan Barang-barang kantor', 'Cash', '2020-09-01', 'rejected', 3, '2020-09-21 06:32:03', '2020-09-09 13:43:56', '2020-09-21 13:32:03', 2, 500000.00, 'Tester For Rejected'),
	(24, 1, 2, 1, 0, 'INV/20200823/IX/01092020001', 3600000.00, 'Penjualan Roti 5 Dus', 'Cash', '2020-09-01', 'rejected', 3, '2020-09-10 06:03:50', '2020-09-09 14:09:47', '2020-09-10 13:03:50', 1, 3600000.00, '-'),
	(25, 1, 1, 1, 0, 'INV/20200901/IX/002', 10800000.00, 'Penjualan Roti 3 Dus', 'Cash', '2020-09-02', 'approved', 3, '2020-09-10 06:04:59', '2020-09-09 14:10:49', '2020-09-10 13:04:59', 3, 3600000.00, '-'),
	(26, 1, 2, 1, 0, 'INV/20200903/IX/003', 3600000.00, 'Penjulan Roti 1 Dus', 'Cash', '2020-09-03', NULL, NULL, NULL, '2020-09-09 14:11:31', '2020-09-09 14:11:31', 1, 3600000.00, '-'),
	(27, 1, 2, 1, 0, 'INV/20200903/IX/004', 1500000.00, 'Penjualan Roti Eceran 100 Pcs', 'Cash', '2020-09-03', NULL, NULL, NULL, '2020-09-09 14:12:08', '2020-09-09 14:12:08', 100, 15000.00, '-'),
	(28, 1, 2, 1, 0, 'INV/20200904/IX/005', 36000000.00, 'Penjulan Roti 10 Dus', 'Cash', '2020-09-04', 'approved', 3, '2020-09-22 07:43:00', '2020-09-09 14:12:38', '2020-09-22 14:43:00', 10, 3600000.00, '-'),
	(29, 1, 2, 1, 1, 'INV/20200823/VIII/9989246', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-09-28 11:36:30', '2020-09-28 11:36:30', 2, 250000.00, 'Informasi pemasukan'),
	(30, 1, 2, 1, 1, 'INV/20200823/VIII/9989247', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-09-28 11:38:34', '2020-09-28 11:38:34', 2, 250000.00, 'Informasi pemasukan'),
	(31, 1, 2, 1, 1, 'INV/20200823/VIII/9989248', 500000.00, 'Deskripsi Pemasukan', 'Cash', '2020-08-23', 'approved', 3, '2020-10-07 07:26:52', '2020-09-28 11:39:34', '2020-10-07 14:26:52', 2, 250000.00, 'Informasi pemasukan'),
	(32, 1, 2, 1, 1, 'INV/20200823/VIII/9989249', 645000.00, 'Penjualan Roti Strwberry', 'Cash', '2020-09-27', 'rejected', 3, '2020-10-01 13:26:35', '2020-09-28 11:52:36', '2020-10-01 20:26:35', 43, 15000.00, 'Penualan Roti dengan pembyaran tunai');
/*!40000 ALTER TABLE `incomes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.ingredients
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `raw_material_id` int(10) unsigned NOT NULL,
  `price` double DEFAULT NULL,
  `ammount` int(6) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_ingredients` (`product_id`,`raw_material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.ingredients: ~1 rows (approximately)
DELETE FROM `ingredients`;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`id`, `product_id`, `raw_material_id`, `price`, `ammount`, `created_at`, `updated_at`) VALUES
	(8, 24, 11, 200000, 20, NULL, NULL);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.journalreviews
CREATE TABLE IF NOT EXISTS `journalreviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_date` date NOT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewer_id` bigint(20) unsigned DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journalreviews_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `journalreviews_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.journalreviews: ~2 rows (approximately)
DELETE FROM `journalreviews`;
/*!40000 ALTER TABLE `journalreviews` DISABLE KEYS */;
INSERT INTO `journalreviews` (`id`, `transaction_date`, `memo`, `status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`) VALUES
	(6, '2020-08-23', 'Memo Review Jurnal Harian', 'Direview & Diposting', 3, '2020-09-10 16:31:28', '2020-09-10 15:26:58', '2020-09-10 23:31:28'),
	(8, '2020-09-02', 'Rekap transaksi terlihat baik dan diterima!', 'Direview & Diposting', 3, '2020-09-21 06:32:05', '2020-09-10 23:55:04', '2020-09-21 13:32:05'),
	(9, '2020-09-03', 'Rekap transaksi terlihat baik dan diterima!', 'Direview & Diposting', 3, '2020-09-10 17:01:15', '2020-09-11 00:01:15', '2020-09-11 00:01:15');
/*!40000 ALTER TABLE `journalreviews` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.journals
CREATE TABLE IF NOT EXISTS `journals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) unsigned NOT NULL,
  `jreview_id` bigint(20) unsigned NOT NULL,
  `date` date NOT NULL,
  `debit` double(13,2) NOT NULL,
  `credit` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journals_account_id_foreign` (`account_id`),
  KEY `journals_jreview_id_foreign` (`jreview_id`),
  CONSTRAINT `journals_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `journals_jreview_id_foreign` FOREIGN KEY (`jreview_id`) REFERENCES `journalreviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.journals: ~5 rows (approximately)
DELETE FROM `journals`;
/*!40000 ALTER TABLE `journals` DISABLE KEYS */;
INSERT INTO `journals` (`id`, `account_id`, `jreview_id`, `date`, `debit`, `credit`, `description`, `created_at`, `updated_at`) VALUES
	(1, 1, 6, '2020-08-23', 2000000.00, 0.00, 'Deskripsi Akun 1', '2020-09-10 16:10:36', '2020-09-10 23:31:28'),
	(2, 1, 6, '2020-08-23', 0.00, 5500000.50, 'Deskripsi Akun 1', '2020-09-10 16:10:37', '2020-09-10 23:31:28'),
	(6, 1, 8, '2020-09-02', 10800000.00, 0.00, 'Deskripsi Akun 1', '2020-09-10 23:55:04', '2020-09-10 23:55:04'),
	(7, 1, 8, '2020-09-02', 0.00, 2300000.00, 'Deskripsi Akun 1', '2020-09-10 23:55:04', '2020-09-10 23:55:04'),
	(8, 2, 8, '2020-09-02', 0.00, 780000.00, 'Deskripsi Akun 2', '2020-09-10 23:55:04', '2020-09-10 23:55:04'),
	(9, 1, 9, '2020-09-03', 5100000.00, 0.00, 'Deskripsi Akun 1', '2020-09-11 00:01:15', '2020-09-11 00:01:15');
/*!40000 ALTER TABLE `journals` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.ledgers
CREATE TABLE IF NOT EXISTS `ledgers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) unsigned NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `debit` double(13,2) NOT NULL,
  `credit` double(13,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ledgers_account_id_foreign` (`account_id`),
  CONSTRAINT `ledgers_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.ledgers: ~11 rows (approximately)
DELETE FROM `ledgers`;
/*!40000 ALTER TABLE `ledgers` DISABLE KEYS */;
INSERT INTO `ledgers` (`id`, `account_id`, `invoice_number`, `date`, `debit`, `credit`, `description`, `created_at`, `updated_at`) VALUES
	(1, 1, '', '2020-08-23', 5000000.00, 4500000.00, 'Deskripsi Buku Besar', '2020-08-25 17:12:06', '2020-08-25 17:12:06'),
	(2, 1, '', '2020-08-23', 4500000.00, 4500000.00, 'Edit Deskripsi Buku Besar', '2020-08-25 17:12:30', '2020-08-25 17:14:53'),
	(5, 1, '', '2020-08-23', 0.00, 500000.00, 'Deskripsi Pengeluaran', '2020-08-27 12:11:30', '2020-08-27 12:11:30'),
	(6, 1, '', '2020-08-23', 500000.00, 0.00, 'Deskripsi Pemasukan', '2020-08-31 11:30:38', '2020-08-31 11:30:38'),
	(7, 1, '', '2020-08-23', 500000.00, 0.00, 'Deskripsi Pemasukan', '2020-08-31 12:11:03', '2020-08-31 12:11:03'),
	(8, 1, '', '2020-08-25', 450000.00, 0.00, 'Penjualan Roti Tawar 10 Pack', '2020-08-31 12:40:08', '2020-08-31 12:40:08'),
	(9, 1, 'INV/20200823/VIII/9989239', '2020-08-23', 0.00, 500000.00, 'Deskripsi Pengeluaran', '2020-09-10 10:15:34', '2020-09-10 10:15:34'),
	(10, 1, 'INV/20200823/VIII/9989239', '2020-08-23', 0.00, 500000.00, 'Deskripsi Pengeluaran', '2020-09-10 10:16:53', '2020-09-10 10:16:53'),
	(11, 1, 'INV/20200823/VIII/9989239', '2020-08-23', 0.00, 500000.00, 'Deskripsi Pengeluaran', '2020-09-10 10:17:02', '2020-09-10 10:17:02'),
	(12, 1, 'INV/20200901/IX/002', '2020-09-02', 10800000.00, 0.00, 'Penjualan Roti 3 Dus', '2020-09-10 13:04:59', '2020-09-10 13:04:59'),
	(13, 1, 'INV/20200823/VIII/9989239', '2020-08-23', 0.00, 500000.00, 'Deskripsi Pengeluaran', '2020-09-21 13:31:54', '2020-09-21 13:31:54'),
	(14, 1, 'INV/20200904/IX/005', '2020-09-04', 36000000.00, 0.00, 'Penjulan Roti 10 Dus', '2020-09-22 14:43:00', '2020-09-22 14:43:00'),
	(15, 1, 'INV/20200823/VIII/9989249', '2020-09-27', 645000.00, 0.00, 'Penjualan Roti Strwberry', '2020-10-01 14:49:53', '2020-10-01 14:49:53'),
	(16, 1, 'INV/20200823/VIII/9989248', '2020-08-23', 500000.00, 0.00, 'Deskripsi Pemasukan', '2020-10-07 14:26:52', '2020-10-07 14:26:52');
/*!40000 ALTER TABLE `ledgers` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.migrations: ~17 rows (approximately)
DELETE FROM `migrations`;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2020_08_12_064027_create_users_table', 1),
	(16, '2020_08_25_075703_create_accounts_table', 2),
	(17, '2020_08_25_075809_create_ledgers_table', 2),
	(18, '2020_08_25_080735_create_customers_table', 2),
	(19, '2020_08_25_080831_create_outcometypes_table', 2),
	(32, '2020_08_25_080836_create_outcomes_table', 3),
	(34, '2020_08_25_081130_create_incomes_table', 3),
	(35, '2020_08_25_081138_create_notifications_table', 3),
	(37, '2020_08_27_022624_update_incomes_table', 4),
	(38, '2020_08_27_101630_update_outcomes_table', 5),
	(41, '2020_09_07_061754_create_journalreviews_table', 6),
	(45, '2020_09_08_061013_create_journals_table', 7),
	(46, '2020_09_20_091702_create_raw_material_table', 8),
	(47, '2020_09_20_091855_create_raw_material_category_table', 8),
	(48, '2020_09_20_091617_create_raw_material_categories_table', 9),
	(49, '2020_09_21_064354_create_product_process_table', 9),
	(50, '2020_09_21_064706_create_products_table', 9),
	(51, '2020_09_21_065144_create_category_product_table', 9),
	(52, '2020_09_21_121242_create_stock_opname_table', 10),
	(53, '2020_09_28_023919_create_productions_table', 11),
	(54, '2020_10_12_085734_create_ingredients_table', 11);
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
DELETE FROM `notifications`;
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
  `information` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `outcomes_user_id_foreign` (`user_id`),
  KEY `outcomes_account_id_foreign` (`account_id`),
  KEY `outcomes_outcometype_id_foreign` (`outcometype_id`),
  KEY `outcomes_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `outcomes_account_id_foreign` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outcomes_outcometype_id_foreign` FOREIGN KEY (`outcometype_id`) REFERENCES `outcometypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `outcomes_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `outcomes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.outcomes: ~5 rows (approximately)
DELETE FROM `outcomes`;
/*!40000 ALTER TABLE `outcomes` DISABLE KEYS */;
INSERT INTO `outcomes` (`id`, `user_id`, `outcometype_id`, `account_id`, `invoice_number`, `ammount`, `description`, `payment_method`, `date`, `review_status`, `reviewer_id`, `review_date`, `created_at`, `updated_at`, `information`) VALUES
	(1, 1, 1, 1, 'INV/20200823/VIII/9989237', 5000000.50, 'Deskripsi Pengeluaran', 'Cash', '2020-08-23', NULL, NULL, NULL, '2020-08-25 16:48:14', '2020-08-25 16:48:14', NULL),
	(2, 2, 2, 1, 'INV/20200823/VIII/9989239', 500000.00, 'Deskripsi Pengeluaran', 'Cash', '2020-08-23', 'approved', 3, '2020-09-21 06:31:54', '2020-08-25 16:48:25', '2020-09-21 13:31:54', 'Informasi Pengeluaran'),
	(4, 3, 1, 2, 'INV/20200823/VIII/9979239', 5000000.00, 'Test123', 'Cash', '2020-06-08', NULL, NULL, NULL, '2020-09-07 14:21:41', '2020-09-07 14:21:41', 'test123'),
	(5, 3, 2, 2, 'INV/OUT/IX/001', 780000.00, 'Pembelian ATK', 'Cash', '2020-09-02', NULL, NULL, NULL, '2020-09-10 22:57:06', '2020-09-10 22:57:06', 'Pembelian ATK untuk keperluan kantor');
/*!40000 ALTER TABLE `outcomes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.outcometypes
CREATE TABLE IF NOT EXISTS `outcometypes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.outcometypes: ~28 rows (approximately)
DELETE FROM `outcometypes`;
/*!40000 ALTER TABLE `outcometypes` DISABLE KEYS */;
INSERT INTO `outcometypes` (`id`, `name`, `type`, `information`, `created_at`, `updated_at`) VALUES
	(1, 'Tagihan Listrik/Air/Telepon/Internet', 'Operasional-Perusahaan', '-', '2020-08-25 16:22:39', '2020-08-25 16:22:39'),
	(2, 'Sewa Gedung', 'Operasional-Perusahaan', 'Type Description 2', '2020-08-25 16:22:47', '2020-09-21 13:31:50'),
	(3, 'Sewa Pabrik', 'Operasional-Perusahaan', 'dd', '2020-09-21 13:31:49', '2020-09-21 13:31:49'),
	(5, 'Biaya Asuransi', 'Operasional-Perusahaan', '-', NULL, NULL),
	(6, 'Alat Tulis Kantor', 'Operasional-Perusahaan', '-', NULL, NULL),
	(7, 'Pengadaan furnitur', 'Operasional-Perusahaan', '-', NULL, NULL),
	(8, 'Pengadaan Kendaraan', 'Operasional-Perusahaan', '-', NULL, NULL),
	(9, 'Pengadaan Elektronik', 'Operasional-Perusahaan', '-', NULL, NULL),
	(10, 'Gaji Pegawai', 'Operasional-Perusahaan', '-', NULL, NULL),
	(11, 'Pemeliharaan Gedung', 'Operasional-Perusahaan', '-', NULL, NULL),
	(12, 'Pemeliharaan Kendaraan', 'Operasional-Perusahaan', '-', NULL, NULL),
	(13, 'Iklan dan pemasaran', 'Operasional-Perusahaan', '-', NULL, NULL),
	(14, 'Pengantaran Penjualan', 'Operasional-Perusahaan', '-', NULL, NULL),
	(15, 'Pengadaan Mesin Pabrik', 'Operasional-Perusahaan', '-', NULL, NULL),
	(16, 'Pengadaan Gedung Kantor', 'Operasional-Perusahaan', '-', NULL, NULL),
	(17, 'Akumulasi Penyusutan Mesin', 'Operasional-Perusahaan', '-', NULL, NULL),
	(18, 'Akumulasi Penyusutan Gedung', 'Operasional-Perusahaan', '-', NULL, NULL),
	(19, 'Akumulasi Penyusutan Kendaraan', 'Operasional-Perusahaan', '-', NULL, NULL),
	(20, 'Biaya lain-lain', 'Operasional-Perusahaan', '-', NULL, NULL),
	(21, 'Pembelian Bahan Baku Langsung', 'Logistik', '-', NULL, NULL),
	(22, 'Pembelian Bahan Baku Pembantu', 'Logistik', '-', NULL, NULL),
	(23, 'Gaji Tenaga Kerja Langsung', 'Logistik', '-', NULL, NULL),
	(24, 'Reparasi & Pemeliharaan Mesin Pabrik', 'Logistik', '-', NULL, NULL),
	(25, 'Reparasi & Pemeliharaan Gedung Pabrik', 'Logistik', '-', NULL, NULL),
	(26, 'Reparasi & Pemeliharaan Kendaraan', 'Logistik', '-', NULL, NULL),
	(27, 'Biaya Angkut Pembelian Bahan Baku', 'Logistik', '-', NULL, NULL),
	(28, 'Tagihan Listrik Air Pabrik', 'Logistik', '-', NULL, NULL),
	(29, 'Biaya Administrasi Pabrik', 'Logistik', '-', NULL, NULL),
	(30, 'Pajak Bumi & bangunan', 'Logistik', '-', NULL, NULL),
	(31, 'Penyusutan Mesin dan Peralatan Pabrik', 'Logistik', '-', NULL, NULL),
	(32, 'Biaya BOP lain-lain', 'Logistik', '-', NULL, NULL);
/*!40000 ALTER TABLE `outcometypes` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.productions
CREATE TABLE IF NOT EXISTS `productions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `raw_mataerial_id` int(10) unsigned NOT NULL,
  `quantity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.productions: ~0 rows (approximately)
DELETE FROM `productions`;
/*!40000 ALTER TABLE `productions` DISABLE KEYS */;
/*!40000 ALTER TABLE `productions` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_category_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.products: ~5 rows (approximately)
DELETE FROM `products`;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `product_category_id`, `name`, `code`, `unit_product`, `stok`, `image`, `information`, `created_at`, `updated_at`) VALUES
	(24, 1, 'Roti Sobek Enak', '002', 'Unit', '50', 'uploads/images/1600882324_651.png', 'Roti Sobek Bagus', '2020-09-24 00:32:04', '2020-09-24 00:32:04'),
	(28, 1, 'pudding', 'bb101', 'Unit', '120', 'uploads/images/1601521935_987.png', '', '2020-10-01 10:12:15', '2020-10-01 10:12:15'),
	(29, 1, 'pudding', 'bb101', 'Unit', '780', 'uploads/images/1601525152_115.png', 'coco', '2020-10-01 11:05:52', '2020-10-01 11:05:52'),
	(30, 1, 'roti', 'bb101', 'Unit', '120', 'uploads/images/1603337307_995.png', '', '2020-10-22 10:28:27', '2020-10-22 10:28:27');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.product_category: ~2 rows (approximately)
DELETE FROM `product_category`;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` (`id`, `name`, `information`, `created_at`, `updated_at`) VALUES
	(1, 'Roti Sobek', '-', NULL, NULL),
	(2, 'Roti Tawar', '-', NULL, NULL);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.product_process
CREATE TABLE IF NOT EXISTS `product_process` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `production_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `production_date` date NOT NULL,
  `date_estimate_complete` date NOT NULL,
  `information` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.product_process: ~2 rows (approximately)
DELETE FROM `product_process`;
/*!40000 ALTER TABLE `product_process` DISABLE KEYS */;
INSERT INTO `product_process` (`id`, `product_id`, `production_code`, `production_date`, `date_estimate_complete`, `information`, `created_at`, `updated_at`) VALUES
	(1, 1, 'R-001', '2020-09-01', '2020-09-10', 'Pembuatan Roti Sobek', '2020-09-21 17:54:01', '2020-09-21 17:54:01');
/*!40000 ALTER TABLE `product_process` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.raw_material
CREATE TABLE IF NOT EXISTS `raw_material` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `raw_material_category_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_buy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_use` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.raw_material: ~22 rows (approximately)
DELETE FROM `raw_material`;
/*!40000 ALTER TABLE `raw_material` DISABLE KEYS */;
INSERT INTO `raw_material` (`id`, `raw_material_category_id`, `name`, `code`, `type`, `unit_buy`, `unit_use`, `created_at`, `updated_at`) VALUES
	(10, 8, 'Tepung', 'bb-001', '1', 'Kilogram', 'Kilogram', '2020-10-12 15:02:16', '2020-10-12 15:02:16'),
	(11, 14, 'Cokelat', 'bb-002', '1', '', '', '2020-10-12 15:02:29', '2020-10-12 15:02:29'),
	(12, 15, 'Susu Bubuk', 'bb-003', '1', '', '', '2020-10-12 15:02:48', '2020-10-12 15:02:48'),
	(13, 16, 'Pengembang', 'bb-004', '1', '', '', '2020-10-12 15:08:30', '2020-10-12 15:08:30'),
	(14, 17, 'Telur', 'bb-005', '1', '', '', '2020-10-12 15:08:44', '2020-10-12 15:08:44'),
	(15, 18, 'Pelembut Kue', 'bb-006', '1', '', '', '2020-10-12 15:08:58', '2020-10-12 15:08:58'),
	(16, 19, 'Kacang', 'bb-007', '1', '', '', '2020-10-12 15:09:10', '2020-10-12 15:09:10'),
	(17, 20, 'Meises', 'bb-008', '1', '', '', '2020-10-12 15:10:09', '2020-10-12 15:10:09'),
	(18, 21, 'Margarin', 'bb-009', '1', '', '', '2020-10-12 15:10:20', '2020-10-12 15:10:20'),
	(19, 22, 'Pasta', 'bb-010', '1', '', '', '2020-10-12 15:10:30', '2020-10-12 15:10:30'),
	(20, 23, 'Selai', 'bb-011', '1', '', '', '2020-10-12 15:10:42', '2020-10-12 15:10:42'),
	(21, 24, 'Pewarna', 'bb-012', '1', '', '', '2020-10-12 15:10:55', '2020-10-12 15:10:55'),
	(22, 25, 'Ragi', 'bb-013', '1', '', '', '2020-10-12 15:11:08', '2020-10-12 15:11:08'),
	(23, 26, 'Cream', 'bb-014', '1', '', '', '2020-10-12 15:11:19', '2020-10-12 15:11:19'),
	(24, 27, 'Pastry', 'bb-016', '1', '', '', '2020-10-12 15:11:31', '2020-10-12 15:11:31'),
	(25, 28, 'Topping', 'bb-017', '1', '', '', '2020-10-12 15:11:43', '2020-10-12 15:11:43'),
	(26, 29, 'Garam', 'bb-018', '1', '', '', '2020-10-12 15:11:56', '2020-10-12 15:11:56'),
	(27, 30, 'Gula', 'bb-019', '1', '', '', '2020-10-12 15:12:10', '2020-10-12 15:12:10'),
	(28, 31, 'Keju', 'bb-020', '1', '', '', '2020-10-12 15:12:20', '2020-10-12 15:12:20'),
	(29, 32, 'Air', 'bb-021', '2', '', '', '2020-10-12 15:12:37', '2020-10-12 15:12:37'),
	(30, 33, 'Bahan Bakar', 'bb-022', '2', '', '', '2020-10-12 15:12:50', '2020-10-12 15:12:50'),
	(31, 34, 'Kardus', 'bb-023', '2', '', '', '2020-10-12 15:13:06', '2020-10-12 15:13:06'),
	(32, 35, 'Plastik', 'bb-024', '2', '', '', '2020-10-12 15:13:17', '2020-10-12 15:13:17'),
	(33, 36, 'Kertas Kue', 'bb-025', '2', '', '', '2020-10-12 15:13:34', '2020-10-12 15:13:34');
/*!40000 ALTER TABLE `raw_material` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.raw_material_categories
CREATE TABLE IF NOT EXISTS `raw_material_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.raw_material_categories: ~0 rows (approximately)
DELETE FROM `raw_material_categories`;
/*!40000 ALTER TABLE `raw_material_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `raw_material_categories` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.raw_material_category
CREATE TABLE IF NOT EXISTS `raw_material_category` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.raw_material_category: ~22 rows (approximately)
DELETE FROM `raw_material_category`;
/*!40000 ALTER TABLE `raw_material_category` DISABLE KEYS */;
INSERT INTO `raw_material_category` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(8, 'Tepung', '2020-09-23 15:07:07', '2020-09-23 15:07:07'),
	(14, 'Cokelat', '2020-10-12 14:59:44', '2020-10-12 14:59:44'),
	(15, 'Susu', '2020-10-12 14:59:48', '2020-10-12 14:59:48'),
	(16, 'Pengembang', '2020-10-12 14:59:55', '2020-10-12 14:59:55'),
	(17, 'Telur', '2020-10-12 15:00:04', '2020-10-12 15:00:04'),
	(18, 'Pelembut', '2020-10-12 15:00:12', '2020-10-12 15:00:12'),
	(19, 'Kacang', '2020-10-12 15:00:17', '2020-10-12 15:00:17'),
	(20, 'Meises', '2020-10-12 15:00:22', '2020-10-12 15:00:22'),
	(21, 'Margarin', '2020-10-12 15:00:26', '2020-10-12 15:00:26'),
	(22, 'Pasta', '2020-10-12 15:00:29', '2020-10-12 15:00:29'),
	(23, 'Selai', '2020-10-12 15:00:33', '2020-10-12 15:00:33'),
	(24, 'Pewarna', '2020-10-12 15:00:38', '2020-10-12 15:00:38'),
	(25, 'Ragi', '2020-10-12 15:00:46', '2020-10-12 15:00:46'),
	(26, 'Cream', '2020-10-12 15:00:49', '2020-10-12 15:00:49'),
	(27, 'Pastry', '2020-10-12 15:00:54', '2020-10-12 15:00:54'),
	(28, 'Topping', '2020-10-12 15:01:00', '2020-10-12 15:01:00'),
	(29, 'Garam', '2020-10-12 15:01:03', '2020-10-12 15:01:03'),
	(30, 'Gula', '2020-10-12 15:01:07', '2020-10-12 15:01:07'),
	(31, 'Keju', '2020-10-12 15:01:10', '2020-10-12 15:01:10'),
	(32, 'Air', '2020-10-12 15:01:13', '2020-10-12 15:01:13'),
	(33, 'Bahan Bakar', '2020-10-12 15:01:17', '2020-10-12 15:01:17'),
	(34, 'Kardus', '2020-10-12 15:01:21', '2020-10-12 15:01:21'),
	(35, 'Plastik', '2020-10-12 15:01:29', '2020-10-12 15:01:29'),
	(36, 'Kertas kue', '2020-10-12 15:01:34', '2020-10-12 15:01:34');
/*!40000 ALTER TABLE `raw_material_category` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.stock_opname
CREATE TABLE IF NOT EXISTS `stock_opname` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.stock_opname: ~4 rows (approximately)
DELETE FROM `stock_opname`;
/*!40000 ALTER TABLE `stock_opname` DISABLE KEYS */;
INSERT INTO `stock_opname` (`id`, `product_id`, `date`, `status`, `stock`, `created_at`, `updated_at`) VALUES
	(1, 1, '2020-09-01', 'Stock Awal', 30, '2020-09-21 20:07:18', '2020-09-21 20:07:18'),
	(2, 1, '2020-09-01', 'Penjualan', 30, '2020-09-21 20:07:54', '2020-09-21 20:07:54'),
	(5, 1, '2020-08-23', 'Penjualan', 2, '2020-09-28 11:39:34', '2020-09-28 11:39:34'),
	(6, 1, '2020-09-27', 'Penjualan', 43, '2020-09-28 11:52:36', '2020-09-28 11:52:36'),
	(7, 1, '2020-10-15', 'Stok Awal', 120, '2020-10-01 11:06:30', '2020-10-01 11:06:30'),
	(8, 24, '2020-10-02', 'Stok Awal', 3, '2020-10-14 13:26:39', '2020-10-14 13:26:39'),
	(9, 28, '2020-10-20', 'Stok Awal', 56, '2020-10-20 19:49:15', '2020-10-20 19:49:15');
/*!40000 ALTER TABLE `stock_opname` ENABLE KEYS */;

-- Dumping structure for table aplikasi_farah_hanifah.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('Admin','Marketing','Operator','Accountant') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table aplikasi_farah_hanifah.users: ~4 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `level`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Marketing', 'marketing', 'marketing@gmail.com', NULL, '$2y$10$9869XJhyseq2Up/n5.dZT.e.eYp2LmSo.a41bTWSVDL8//bRQDO32', 'Marketing', NULL, '2020-08-12 14:46:59', '2020-08-12 14:46:59'),
	(2, 'Operator', 'operator', 'operator@gmail.com', NULL, '$2y$10$hwTuF0N3jc9/RcBcfQaGKeHyY39kIoWmkN8OiziQeWTB.A7.bnclK', 'Operator', NULL, '2020-08-12 14:46:59', '2020-08-12 14:46:59'),
	(3, 'Accountant', 'accountant', 'accountant@gmail.com', NULL, '$2y$10$SFtjOHF1ZVQ9lHZ1ugt4yOOpkT2eVXUjudFcrKakZD4CJSIsqC.52', 'Accountant', NULL, '2020-08-12 14:47:00', '2020-08-12 14:47:00'),
	(4, 'Administrator', 'admin', 'admin@gmail.com', NULL, '$2y$10$9869XJhyseq2Up/n5.dZT.e.eYp2LmSo.a41bTWSVDL8//bRQDO32', 'Admin', NULL, '2020-09-15 22:54:47', '2020-09-15 22:54:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
