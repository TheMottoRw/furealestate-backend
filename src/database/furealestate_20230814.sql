-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: furealestate
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `sale_type` enum('Sell','Rent') COLLATE utf8mb4_general_ci DEFAULT 'Sell',
  `payment_mode` enum('Once','Monthly') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` text COLLATE utf8mb4_general_ci,
  `contract_start` date DEFAULT NULL,
  `contract_end` date DEFAULT NULL,
  `status` enum('Pending','Accepted','Rejected') COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `is_deleted` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  CONSTRAINT `bid_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (1,1,2,'Sell','Monthly','450000','2023-07-05','2023-07-05','Accepted',NULL,'2023-08-05 15:34:05','2023-07-12 21:38:47'),(2,4,2,'Sell','Once','1400','2023-08-04','2023-08-31','Pending',NULL,'2023-08-05 13:19:27','2023-08-05 13:19:27');
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '',
  `brief_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `property_usage_type` enum('Residential','Commercial') COLLATE utf8mb4_general_ci DEFAULT 'Residential',
  `description` text COLLATE utf8mb4_general_ci,
  `photos` text COLLATE utf8mb4_general_ci,
  `rooms` int DEFAULT '0',
  `bathroom` int DEFAULT '0',
  `parking_slots` int DEFAULT '0',
  `sqm` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `year_built` year DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '0',
  `address` text COLLATE utf8mb4_general_ci,
  `status` enum('Rent','Sold','For rent','For sale') COLLATE utf8mb4_general_ci DEFAULT 'For sale',
  `is_deleted` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,NULL,'','Inzu nziza iri ku muhanda','Residential','Ifite byose umuntu yakunda','undefined',4,2,2,'304',2019,'17000000','Kabagari','Rent',NULL,'2023-08-05 15:37:19','2023-07-12 21:16:47'),(2,NULL,'','Inzu nziza yo gucururizamo','Commercial','Ifite byose umuntu yakunda','undefined',0,1,0,'4',2019,'500000','Kabagari','For sale',NULL,'2023-07-12 21:26:48','2023-07-12 21:25:18'),(3,NULL,'32','Inzu nziza iri ku muhanda','Residential','Iri kuri kaburimbo yubakishije bloque ciment','undefined',3,2,2,'300',2019,'14500','kg567st','For sale',NULL,'2023-07-16 16:56:51','2023-07-16 16:56:51'),(4,NULL,'C100','AMAMADADSA','Residential','Ni nziza cyaneeee','undefined',2,1,3,'340',2018,'1400','KGL123','For sale',NULL,'2023-07-30 19:38:03','2023-07-30 19:38:03'),(5,3,'C109','Very good apartment','Residential','Iherereye Nyarutarama ahantu hirengeye kigali','',4,3,1,'304',2019,'23000','KG568ST','For sale',NULL,'2023-08-14 14:12:43','2023-08-14 14:01:31'),(6,3,'C1010','Very good house for a family','Residential','Iherereye gacuriro','',5,2,3,'304',2018,'23000','KG569ST','For sale',NULL,'2023-08-14 14:12:43','2023-08-14 14:04:35'),(7,3,'C1090','Very interesting house','Residential','fdsadfs','[{\"fieldname\":\"photos\",\"originalname\":\"Screenshot from 2023-04-04 09-39-21.png\",\"encoding\":\"7bit\",\"mimetype\":\"image/png\",\"destination\":\"src/uploads/\",\"filename\":\"a144949d8ee27793d6fde474192dda10\",\"path\":\"src/uploads/a144949d8ee27793d6fde474192dda10\",\"size\":99622},{\"fieldname\":\"photos\",\"originalname\":\"Screenshot from 2023-04-04 09-39-02.png\",\"encoding\":\"7bit\",\"mimetype\":\"image/png\",\"destination\":\"src/uploads/\",\"filename\":\"5ff3f001ad22f67fac29a2a9860396c3\",\"path\":\"src/uploads/5ff3f001ad22f67fac29a2a9860396c3\",\"size\":56810}]',2,2,1,'308',2017,'25000','kg452st','For sale',NULL,'2023-08-14 14:12:05','2023-08-14 14:12:05');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `message` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,2,'undefined','2023-08-05 16:18:43'),(2,2,2,'undefined','2023-08-05 16:19:49'),(3,2,2,'Very good and clean','2023-08-05 16:21:04');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `sale_type` enum('Sold','Rent') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_mode` enum('Once','Monthly') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` text COLLATE utf8mb4_general_ci,
  `contract_start` date DEFAULT NULL,
  `contract_end` date DEFAULT NULL,
  `status` enum('Sold','Rent') COLLATE utf8mb4_general_ci DEFAULT 'Sold',
  `is_deleted` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,2,'Rent','Once','450000','2023-07-05','2024-07-05','Sold',NULL,'2023-07-12 21:41:39','2023-07-12 21:40:53'),(2,1,2,'Sold','Monthly','450000','2023-07-04','2023-07-04','Sold',NULL,'2023-08-05 15:34:45','2023-08-05 15:34:45'),(3,1,2,'Sold','Monthly','450000','2023-07-04','2023-07-04','Sold',NULL,'2023-08-05 15:36:17','2023-08-05 15:36:17'),(4,1,2,'Sold','Monthly','450000','2023-07-04','2023-07-04','Rent',NULL,'2023-08-05 15:37:19','2023-08-05 15:37:19');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_type` enum('admin','landlord','client') COLLATE utf8mb4_general_ci DEFAULT 'client',
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','0780000001','damn@yopmail.com','admin','12345',NULL,'2023-08-14 09:23:23','2023-07-12 21:09:49'),(2,'Client Rutagengwa','0780000002','client@yopmail.com','client','12345',NULL,'2023-08-14 09:23:16','2023-07-12 21:11:15'),(3,'Emile Landlord','0780123652','landlord@gmail.com','landlord','12345',NULL,'2023-08-14 09:23:03','2023-07-16 16:36:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 16:59:18
