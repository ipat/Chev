-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chev_database`
--

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=25 ;

--
-- dump ตาราง `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(24, 18, '2015-01-11 15:24:32', '2015-01-11 15:24:32');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `cart_product`
--

CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `setAmount` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `transferTime` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=25 ;

--
-- dump ตาราง `order`
--

INSERT INTO `order` (`id`, `user_id`, `total`, `transferTime`, `status`, `updated_at`, `created_at`) VALUES
(1, 18, 10000, '0000-00-00 00:00:00', 0, '2015-01-29 03:33:45', '2015-01-29 03:33:45'),
(2, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:39:49', '2015-01-29 03:39:49'),
(3, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:40:23', '2015-01-29 03:40:23'),
(4, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:40:50', '2015-01-29 03:40:50'),
(5, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:43:38', '2015-01-29 03:43:38'),
(6, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:44:14', '2015-01-29 03:44:14'),
(7, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:44:37', '2015-01-29 03:44:37'),
(8, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:44:58', '2015-01-29 03:44:58'),
(9, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:46:54', '2015-01-29 03:46:54'),
(10, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:47:17', '2015-01-29 03:47:17'),
(11, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:47:36', '2015-01-29 03:47:36'),
(12, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:48:52', '2015-01-29 03:48:52'),
(13, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:48:53', '2015-01-29 03:48:53'),
(14, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:48:54', '2015-01-29 03:48:54'),
(15, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:49:59', '2015-01-29 03:49:59'),
(16, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:04', '2015-01-29 03:50:04'),
(17, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:16', '2015-01-29 03:50:16'),
(18, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:21', '2015-01-29 03:50:21'),
(19, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:37', '2015-01-29 03:50:37'),
(20, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:45', '2015-01-29 03:50:45'),
(21, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:50:53', '2015-01-29 03:50:53'),
(22, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:51:05', '2015-01-29 03:51:05'),
(23, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:52:54', '2015-01-29 03:52:54'),
(24, 18, 23190, '0000-00-00 00:00:00', 0, '2015-01-29 03:53:23', '2015-01-29 03:53:23');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `order_address`
--

CREATE TABLE IF NOT EXISTS `order_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `house` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `house_name` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `road` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `district` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `county` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `province` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `postcode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- dump ตาราง `order_address`
--

INSERT INTO `order_address` (`id`, `order_id`, `title`, `house`, `house_name`, `road`, `district`, `county`, `province`, `postcode`, `country`, `updated_at`, `created_at`) VALUES
(4, 2, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 24, 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', '2015-01-29 03:53:23', '2015-01-29 03:53:23');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `order_payinfo`
--

CREATE TABLE IF NOT EXISTS `order_payinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `bank` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `time` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `order_product`
--

CREATE TABLE IF NOT EXISTS `order_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `setAmount` int(11) NOT NULL,
  `allPrice` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- dump ตาราง `order_product`
--

INSERT INTO `order_product` (`id`, `order_id`, `product_id`, `setAmount`, `allPrice`, `updated_at`, `created_at`) VALUES
(1, 20, 1, 1, 990, '2015-01-29 03:50:45', '2015-01-29 03:50:45'),
(2, 20, 2, 6, 3700, '2015-01-29 03:50:45', '2015-01-29 03:50:45'),
(3, 21, 1, 1, 990, '2015-01-29 03:50:53', '2015-01-29 03:50:53'),
(4, 21, 2, 6, 3700, '2015-01-29 03:50:53', '2015-01-29 03:50:53'),
(5, 22, 1, 1, 990, '2015-01-29 03:51:06', '2015-01-29 03:51:06'),
(6, 22, 2, 6, 3700, '2015-01-29 03:51:06', '2015-01-29 03:51:06'),
(7, 23, 1, 1, 990, '2015-01-29 03:52:54', '2015-01-29 03:52:54'),
(8, 23, 2, 6, 3700, '2015-01-29 03:52:54', '2015-01-29 03:52:54'),
(9, 24, 1, 1, 990, '2015-01-29 03:53:23', '2015-01-29 03:53:23'),
(10, 24, 2, 6, 3700, '2015-01-29 03:53:23', '2015-01-29 03:53:23');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `order_sendinfo`
--

CREATE TABLE IF NOT EXISTS `order_sendinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `tracking_code` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `arrival_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- dump ตาราง `order_sendinfo`
--

INSERT INTO `order_sendinfo` (`id`, `order_id`, `tracking_code`, `arrival_date`, `created_at`, `updated_at`) VALUES
(3, 1, '432345676546', '2014-10-30', '2014-10-29 22:24:15', '2014-10-29 22:24:15'),
(4, 3, '1234567890', '2014-10-31', '2014-10-30 16:53:57', '2014-10-30 16:53:57');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `information` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `allprice` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- dump ตาราง `product`
--

INSERT INTO `product` (`id`, `name`, `information`, `amount`, `allprice`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Chev-Diet', '30 pills each', 1, 990, 1, '2015-01-08 00:00:00', '0000-00-00 00:00:00'),
(2, '4plus2', 'promotion buy 4 given 2', 4, 3700, 2, '2015-01-14 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `reward`
--

CREATE TABLE IF NOT EXISTS `reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `reward_product` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `reward_discount` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- dump ตาราง `reward`
--

INSERT INTO `reward` (`id`, `product_id`, `reward_product`, `amount`, `reward_discount`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 2, 30, '2015-01-16 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_temp` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `resetcode` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `facebook` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '0: normal, 1: admin',
  `tel` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `gender` int(11) NOT NULL COMMENT '0: 100% female, 100: 100% male',
  `default_address_id` int(11) DEFAULT NULL,
  `name_first` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `name_last` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- dump ตาราง `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `password_temp`, `resetcode`, `facebook`, `level`, `tel`, `gender`, `default_address_id`, `name_first`, `name_last`, `remember_token`, `updated_at`, `created_at`) VALUES
(17, 'lenszaza@hotmail.com', '$2y$10$ewpaQU1z3JCAne5KT80WouaFx9PLvy0e/dL7/ugrtyPaAIQ4NYfqa', '', '', NULL, 0, '0908878883', 100, NULL, 'lens', 'lens', '', '2015-01-06 09:37:33', '2015-01-06 09:37:33'),
(18, 'qweqweqwe@gmail.com', '$2y$10$CwQTxzwaODXFzesbHdg9BOsKdV.xrswKQUHqwqr.l5hBJiLp05aiO', '', '', NULL, 0, '0861234123', 100, NULL, 'qweqwe', 'qweqwe', 'kqzFhkMRNPTxkzES5myhrhG8T1CCbJTY0Xz1N1zdJW5fM3NfkyOV8LivukvB', '2015-01-11 15:24:16', '2015-01-10 17:46:37'),
(19, 'a@a.a', '$2y$10$R9wO8Ff9iEGg09wg1ozxXepjLG8fSj9Fm4vjHZPyY0rIDzV8GZU6K', '', '', NULL, 0, '0911111111', 100, NULL, 'หน้าหม้อ', 'ล่อให้เด็กมาเล่น', '', '2015-01-15 10:49:19', '2015-01-15 10:49:19');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `user_address`
--

CREATE TABLE IF NOT EXISTS `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `house` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `house_name` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `road` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `district` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `county` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `province` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `postcode` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- dump ตาราง `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `title`, `house`, `house_name`, `road`, `district`, `county`, `province`, `postcode`, `country`, `updated_at`, `created_at`) VALUES
(1, 18, 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
