-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: ankitpersonal
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `connections` (
  `connection` int(11) NOT NULL AUTO_INCREMENT,
  `user_one` int(11) DEFAULT NULL,
  `user_two` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`connection`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES (1,2,1,1,'2020-03-08 06:13:05'),(2,2,3,1,'2020-03-08 06:13:50'),(3,2,4,1,'2020-03-08 06:13:51'),(4,2,5,1,'2020-03-08 06:13:52'),(5,2,6,1,'2020-03-08 06:13:52'),(6,2,7,1,'2020-03-08 06:13:52'),(7,2,8,1,'2020-03-08 06:13:52'),(8,2,9,1,'2020-03-08 06:13:52'),(9,2,10,0,'2020-03-08 06:13:52'),(10,2,11,0,'2020-03-08 06:13:52'),(11,2,12,0,'2020-03-08 06:13:53'),(12,2,13,0,'2020-03-08 06:13:53'),(14,1,4,1,'2020-03-08 06:13:59'),(24,3,4,1,'2020-03-08 06:14:58'),(25,3,5,1,'2020-03-08 06:14:58'),(26,3,6,1,'2020-03-08 06:14:59'),(27,3,7,1,'2020-03-08 06:14:59'),(28,3,8,0,'2020-03-08 06:14:59'),(30,3,10,0,'2020-03-08 06:14:59'),(31,3,11,0,'2020-03-08 06:15:00'),(32,3,12,1,'2020-03-08 06:15:00'),(33,3,13,1,'2020-03-08 06:15:00'),(35,6,4,1,'2020-03-08 06:21:37'),(36,6,5,1,'2020-03-08 06:21:37'),(37,6,7,0,'2020-03-08 06:21:37'),(38,6,8,0,'2020-03-08 06:21:37'),(39,6,9,1,'2020-03-08 06:21:37'),(40,6,10,0,'2020-03-08 06:21:37'),(41,6,11,0,'2020-03-08 06:21:37'),(42,6,12,1,'2020-03-08 06:21:37'),(43,6,13,1,'2020-03-08 06:21:38'),(46,9,4,1,'2020-03-08 06:23:24'),(47,9,5,1,'2020-03-08 06:23:24'),(48,9,7,0,'2020-03-08 06:23:25'),(49,9,8,0,'2020-03-08 06:23:25'),(50,9,10,0,'2020-03-08 06:23:25'),(51,9,11,0,'2020-03-08 06:23:25'),(52,9,12,0,'2020-03-08 06:23:25'),(53,9,13,0,'2020-03-08 06:23:25'),(54,7,4,1,'2020-03-08 06:24:59'),(55,7,5,1,'2020-03-08 06:25:00'),(56,7,8,0,'2020-03-08 06:25:00'),(57,7,10,0,'2020-03-08 06:25:00'),(58,7,11,0,'2020-03-08 06:25:00'),(59,7,12,0,'2020-03-08 06:25:00'),(60,7,13,1,'2020-03-08 06:25:00'),(62,13,4,1,'2020-03-08 06:25:32'),(63,13,5,1,'2020-03-08 06:25:32'),(64,13,8,0,'2020-03-08 06:25:32'),(65,13,10,0,'2020-03-08 06:25:32'),(66,13,11,0,'2020-03-08 06:25:32'),(67,13,12,0,'2020-03-08 06:25:32'),(73,1,3,1,'2020-03-10 05:59:39'),(81,1,6,0,'2020-03-10 06:21:21'),(84,1,10,0,'2020-03-10 06:21:22'),(85,1,11,0,'2020-03-10 06:21:22'),(86,1,12,0,'2020-03-10 06:21:22'),(88,5,1,1,'2020-03-13 15:47:51'),(89,5,4,1,'2020-03-13 15:47:51'),(90,5,8,0,'2020-03-13 15:47:52'),(91,5,10,0,'2020-03-13 15:47:52'),(92,5,11,0,'2020-03-13 15:47:52'),(93,5,12,0,'2020-03-13 15:47:52'),(94,1,7,0,'2020-03-13 15:59:35'),(95,1,8,0,'2020-03-13 15:59:35'),(96,1,9,0,'2020-03-13 15:59:35'),(97,1,13,0,'2020-03-13 15:59:35');
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `data` (
  `data_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_one` int(11) DEFAULT NULL,
  `user_two` int(11) DEFAULT NULL,
  `data` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data`
--

LOCK TABLES `data` WRITE;
/*!40000 ALTER TABLE `data` DISABLE KEYS */;
INSERT INTO `data` VALUES (1,3,1,'Hey Ankit',1,'2020-03-08 06:14:33'),(2,1,3,'Hey Parikshit',1,'2020-03-08 06:14:51'),(3,2,3,'Hey',1,'2020-03-10 05:43:53'),(4,2,1,'hey',1,'2020-03-10 05:44:02'),(5,1,2,'I am Ankit',1,'2020-03-10 05:44:24'),(6,2,1,'{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}',1,'2020-03-10 05:44:47'),(7,1,2,'Hey',1,'2020-03-10 06:20:05'),(8,1,2,'okay',1,'2020-03-10 06:20:08'),(9,1,2,'hey again!',1,'2020-03-13 15:26:15'),(10,3,1,'Hey!',1,'2020-03-13 15:46:48'),(11,3,1,'whats up1',1,'2020-03-13 15:46:53'),(12,3,1,'bye',1,'2020-03-13 15:46:57'),(13,3,2,'Yo NIshant!',1,'2020-03-13 16:05:00'),(14,3,2,'how are you dude?',1,'2020-03-13 16:05:08'),(15,2,3,'How are you doing?',1,'2020-03-13 16:05:28');
/*!40000 ALTER TABLE `data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `online` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `socket` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ankit','ankit',0,'2020-03-08 05:22:45','bUj1lTWYQD9pZafnAAAK'),(2,'Nishant','ankit',0,'2020-03-08 05:22:53','GpwylNx7pVTK233TAAAN'),(3,'Parikshit','ankit',0,'2020-03-08 05:23:00','_gNpRnj1oz9hy8BiAAAM'),(4,'Karan','ankit',0,'2020-03-08 05:23:09','sLW9LrGOO7Fu1SIxAAAH'),(5,'Parshant','ankit',0,'2020-03-08 05:23:21','Bzc6YM9TnklKjFMEAAAP'),(6,'Rahul','ankit',0,'2020-03-08 05:23:30','kHHg0s-bv5mYdOWGAAAe'),(7,'Abhishek','ankit',0,'2020-03-08 05:23:52','PQn_NZRoEe1tpfqfAAAt'),(8,'Abhijeet','ankit',0,'2020-03-08 05:24:08','PTptzvvp5ep8s4FRAAAr'),(9,'Manoj','ankit',0,'2020-03-08 05:24:19','MyOkpyetFsHAuRTtAACh'),(10,'Manish','ankit',0,'2020-03-08 05:24:27',NULL),(11,'AnkitKumar','ankit',0,'2020-03-08 05:24:33',NULL),(12,'Suraj','ankit',0,'2020-03-08 05:24:45','Ypa6VSuSh10TF1teAAAg'),(13,'Vishal','ankit',0,'2020-03-08 05:24:52','cgvI4ZR_tdJf-odiAAAv');
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

-- Dump completed on 2020-03-17 15:14:34
