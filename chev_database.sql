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

--
-- dump ตาราง `cart_product`
--

INSERT INTO `cart_product` (`id`, `cart_id`, `product_id`, `setAmount`, `created_at`, `updated_at`) VALUES
(8, 24, 1, 1, '2015-01-11 15:24:32', '2015-01-11 15:24:32'),
(9, 24, 2, 2, '2015-01-11 15:24:32', '2015-01-11 15:24:40');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

--
-- dump ตาราง `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `password_temp`, `resetcode`, `facebook`, `level`, `tel`, `gender`, `default_address_id`, `name_first`, `name_last`, `remember_token`, `updated_at`, `created_at`) VALUES
(17, 'lenszaza@hotmail.com', '$2y$10$ewpaQU1z3JCAne5KT80WouaFx9PLvy0e/dL7/ugrtyPaAIQ4NYfqa', '', '', NULL, 0, '0908878883', 100, NULL, 'lens', 'lens', '', '2015-01-06 09:37:33', '2015-01-06 09:37:33'),
(18, 'qweqweqwe@gmail.com', '$2y$10$CwQTxzwaODXFzesbHdg9BOsKdV.xrswKQUHqwqr.l5hBJiLp05aiO', '', '', NULL, 0, '0861234123', 100, NULL, 'qweqwe', 'qweqwe', 'kqzFhkMRNPTxkzES5myhrhG8T1CCbJTY0Xz1N1zdJW5fM3NfkyOV8LivukvB', '2015-01-11 15:24:16', '2015-01-10 17:46:37');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
