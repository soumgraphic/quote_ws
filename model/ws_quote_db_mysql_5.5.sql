-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 30 nov. 2018 à 14:01
-- Version du serveur :  5.7.21
-- Version de PHP :  5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ws_quote_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `q_author`
--

DROP TABLE IF EXISTS `q_author`;
CREATE TABLE IF NOT EXISTS `q_author` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_name` varchar(100) NOT NULL,
  `a_create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `a_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `q_author`
--

INSERT INTO `q_author` (`a_id`, `a_name`, `a_create_date`, `a_last_update`) VALUES
(18, 'MHD', '2018-11-18 22:50:01', '2018-11-18 22:50:01'),
(22, 'MHD', '2018-11-18 22:50:06', '2018-11-18 22:50:06'),
(23, 'Soumaila DIARRA', '2018-11-25 15:02:35', '2018-11-25 15:02:35'),
(24, 'Abdourahamane', '2018-11-25 19:14:19', '2018-11-25 19:14:19'),
(25, 'Abdourahamane', '2018-11-25 23:22:13', '2018-11-25 23:22:13'),
(26, 'Abdourahamane', '2018-11-25 23:22:14', '2018-11-25 23:22:14'),
(27, 'Abdourahamane', '2018-11-25 23:22:32', '2018-11-25 23:22:32'),
(28, 'Abdourahamane', '2018-11-25 23:22:33', '2018-11-25 23:22:33');

-- --------------------------------------------------------

--
-- Structure de la table `q_category`
--

DROP TABLE IF EXISTS `q_category`;
CREATE TABLE IF NOT EXISTS `q_category` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(100) NOT NULL,
  `c_create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `c_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `q_category`
--

INSERT INTO `q_category` (`c_id`, `c_name`, `c_create_date`, `c_last_update`) VALUES
(1, 'Informatique', '2018-10-31 00:30:49', '2018-10-31 00:30:49'),
(2, 'Musique', '2018-11-04 06:30:59', '2018-11-04 06:30:59'),
(7, 'Samiga charles', '2018-11-17 07:51:41', '2018-11-17 07:52:25'),
(8, 'Samiga KAI', '2018-11-27 22:12:58', '2018-11-27 22:12:58'),
(9, 'Samiga KAI', '2018-11-27 22:27:10', '2018-11-27 22:27:10'),
(10, 'Lol', '2018-11-30 10:59:01', '2018-11-30 10:59:01'),
(11, 'Bonjour', '2018-11-30 11:03:03', '2018-11-30 11:03:03'),
(12, 'Zeroo', '2018-11-30 11:36:39', '2018-11-30 11:36:39'),
(13, 'Soumii', '2018-11-30 11:40:09', '2018-11-30 11:40:09'),
(14, 'BonjourDJO', '2018-11-30 11:41:32', '2018-11-30 11:41:32'),
(15, 'Pikololo', '2018-11-30 12:05:33', '2018-11-30 12:05:33');

-- --------------------------------------------------------

--
-- Structure de la table `q_quote`
--

DROP TABLE IF EXISTS `q_quote`;
CREATE TABLE IF NOT EXISTS `q_quote` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `q_text` varchar(2000) NOT NULL,
  `a_create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `a_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `q_author_a_id` int(11) NOT NULL,
  `q_category_c_id` int(11) NOT NULL,
  `u_user_u_id` int(11) NOT NULL,
  PRIMARY KEY (`q_id`),
  KEY `fk_q_quote_q_author1` (`q_author_a_id`),
  KEY `fk_q_quote_q_category1` (`q_category_c_id`),
  KEY `fk_q_quote_u_user1` (`u_user_u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `q_quote`
--

INSERT INTO `q_quote` (`q_id`, `q_text`, `a_create_date`, `a_last_update`, `q_author_a_id`, `q_category_c_id`, `u_user_u_id`) VALUES
(13, 'L\'avenir appartient à ceux qui rêvent trop.', '2018-11-18 22:52:24', '2018-11-18 22:52:24', 18, 2, 4),
(15, 'L\'avenir appartient à ceux qui rêvent trop.', '2018-11-18 22:52:30', '2018-11-18 22:52:30', 18, 2, 4),
(17, 'Vive le coding', '2018-11-25 23:06:34', '2018-11-25 23:06:34', 24, 1, 2),
(19, 'Il ny\'a rien de plus belle que la vie', '2018-11-25 23:09:32', '2018-11-25 23:09:32', 23, 2, 23);

-- --------------------------------------------------------

--
-- Structure de la table `q_quote_has_q_tag`
--

DROP TABLE IF EXISTS `q_quote_has_q_tag`;
CREATE TABLE IF NOT EXISTS `q_quote_has_q_tag` (
  `q_quote_q_id` int(11) NOT NULL,
  `q_tag_t_id` int(11) NOT NULL,
  PRIMARY KEY (`q_quote_q_id`,`q_tag_t_id`),
  KEY `fk_q_quote_has_q_tag_q_tag1` (`q_tag_t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `q_quote_has_q_tag`
--

INSERT INTO `q_quote_has_q_tag` (`q_quote_q_id`, `q_tag_t_id`) VALUES
(13, 2),
(13, 3),
(15, 3),
(13, 4),
(13, 6),
(15, 6),
(13, 7);

-- --------------------------------------------------------

--
-- Structure de la table `q_tag`
--

DROP TABLE IF EXISTS `q_tag`;
CREATE TABLE IF NOT EXISTS `q_tag` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(100) NOT NULL,
  `t_create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `t_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `q_tag`
--

INSERT INTO `q_tag` (`t_id`, `t_name`, `t_create_date`, `t_last_update`) VALUES
(2, 'Technologie', '2018-10-31 00:32:09', '2018-10-31 00:32:09'),
(3, 'IT', '2018-10-31 00:32:32', '2018-10-31 00:32:32'),
(4, 'Dosso', '2018-11-18 22:12:28', '2018-11-18 22:12:28'),
(5, 'Dosso', '2018-11-18 22:12:30', '2018-11-18 22:12:30'),
(6, 'Tonight', '2018-11-18 22:46:19', '2018-11-18 22:46:19'),
(7, 'Tonight', '2018-11-18 22:46:21', '2018-11-18 22:46:21'),
(8, 'T', '2018-11-25 15:12:35', '2018-11-25 15:12:35');

-- --------------------------------------------------------

--
-- Structure de la table `u_user`
--

DROP TABLE IF EXISTS `u_user`;
CREATE TABLE IF NOT EXISTS `u_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_password` varchar(200) NOT NULL,
  `u_create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `u_user`
--

INSERT INTO `u_user` (`u_id`, `u_name`, `u_email`, `u_password`, `u_create_date`, `u_last_update`) VALUES
(1, 'Abdoulaye DIARRA', 'abdoulaye.diarra@gmail.com', '12345678', '2018-10-31 00:34:40', '2018-10-31 00:34:40'),
(2, 'Damso', 'damso@gmail.com', '123456', '2018-11-01 00:11:13', '2018-11-01 00:11:13'),
(3, 'Damso', 'damso@gmail.com', '123456', '2018-11-01 00:11:20', '2018-11-01 00:11:20'),
(4, 'Damso1', 'damso@gmail.com', '123456', '2018-11-01 13:03:33', '2018-11-01 13:03:33'),
(5, 'Damso Orelsan', 'damso@gmail.com', '123456', '2018-11-01 13:04:27', '2018-11-18 19:05:52'),
(6, 'Damso123', 'damso@gmail.com', '123456', '2018-11-01 13:04:51', '2018-11-01 13:04:51'),
(7, 'Damso123', 'damso@gmail.com', '123456', '2018-11-01 13:06:12', '2018-11-01 13:06:12'),
(8, 'Van guitare', 'damso@gmail.com', '123456', '2018-11-01 13:06:37', '2018-11-01 13:06:37'),
(9, 'Aya nakamura', 'damso@gmail.com', '123456', '2018-11-01 13:12:52', '2018-11-01 13:12:52'),
(10, 'Sira Bintsi', 'damso@gmail.com', '123456', '2018-11-01 14:10:43', '2018-11-01 14:10:43'),
(11, 'Sira Bintsi', 'damso@gmail.com', '123456', '2018-11-01 14:10:59', '2018-11-01 14:10:59'),
(12, 'Emmanuel M.', 'manu@gmail.com', '123456', '2018-11-01 14:46:04', '2018-11-01 14:46:04'),
(13, 'Emmanuel M.', 'manu@gmail.com', '123456', '2018-11-01 14:46:12', '2018-11-01 14:46:12'),
(14, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 18:56:59', '2018-11-01 18:56:59'),
(15, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 18:57:58', '2018-11-01 18:57:58'),
(16, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 19:01:37', '2018-11-01 19:01:37'),
(17, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 19:08:16', '2018-11-01 19:08:16'),
(18, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 19:08:27', '2018-11-01 19:08:27'),
(19, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 19:15:21', '2018-11-01 19:15:21'),
(20, 'Nelly ya.', 'manu@gmail.com', '123456', '2018-11-01 19:15:31', '2018-11-01 19:15:31'),
(21, 'Papson', 'manu@gmail.com', '123456', '2018-11-01 20:15:10', '2018-11-01 20:15:10'),
(22, 'Papson', 'manu@gmail.com', '123456', '2018-11-01 20:15:16', '2018-11-01 20:15:16'),
(23, 'Youssoupha', 'manu@gmail.com', '123456', '2018-11-04 21:41:38', '2018-11-04 21:41:38'),
(24, 'Youssoupha', 'manu@gmail.com', '123456', '2018-11-04 21:41:44', '2018-11-04 21:41:44'),
(25, 'Youssoupha', 'manu@gmail.com', '123456', '2018-11-04 21:42:21', '2018-11-04 21:42:21'),
(27, 'Youssoupha', 'manu@gmail.com', '123456', '2018-11-04 21:43:00', '2018-11-04 21:43:00'),
(28, 'Youssoupha', 'manu@gmail.com', '123456', '2018-11-04 21:43:01', '2018-11-04 21:43:01'),
(29, 'Youssoupha', 'manu@gmail.com', '$2a$10$6FDM5Srs6tlnnlK6qpBtxe4c52GtFX4Esiv6LorUUex0CyGaYQjzy', '2018-11-04 22:58:21', '2018-11-04 22:58:21'),
(30, 'Toumani', 'manu@gmail.com', '$2a$10$3qAnda7MabXIej8kDre.OecAqpfnY89bisAYi2Uj3WP/xS0GqwmRK', '2018-11-04 22:59:26', '2018-11-04 22:59:26'),
(31, 'Toumani', 'manu@gmail.com', '$2a$10$5m5zNuiFy9LEBezYFx6VR.MbCZN10CHcS/H8ClyV4LdIK84PhJsaK', '2018-11-04 22:59:28', '2018-11-04 22:59:28'),
(32, 'Toumani', 'manu@gmail.com', '$2a$10$Napy/jKhYUS2/OgczNjZlOc9gJqKSSc4Vr4Ds/AHlPWZwMxbwqjMy', '2018-11-04 22:59:32', '2018-11-04 22:59:32'),
(33, 'Toumani', 'manu@gmail.com', '$2a$10$m7wD3dEY/.aIdpPY.uVtfuv648r9jzc6fEa1BQrdAeIA34bLSc/5K', '2018-11-04 23:02:38', '2018-11-04 23:02:38'),
(34, 'Ali farka', 'farka.ali@gmail.com', '$2a$10$hPgGpE1fXKvH7lRnLz5HAeNyCgjnFULdlda8hYOFSgxQToF6NqrzW', '2018-11-04 23:51:49', '2018-11-04 23:51:49'),
(35, 'Ali farka', 'farka12.ali@gmail.com', '$2a$10$WZAaU..w2a4Mqf2ysdrj2exWox01UkjFd5aJmWsH70NOcUpAM5pYq', '2018-11-05 00:50:04', '2018-11-05 00:50:04');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `q_quote`
--
ALTER TABLE `q_quote`
  ADD CONSTRAINT `fk_q_quote_q_author1` FOREIGN KEY (`q_author_a_id`) REFERENCES `q_author` (`a_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_q_quote_q_category1` FOREIGN KEY (`q_category_c_id`) REFERENCES `q_category` (`c_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_q_quote_u_user1` FOREIGN KEY (`u_user_u_id`) REFERENCES `u_user` (`u_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `q_quote_has_q_tag`
--
ALTER TABLE `q_quote_has_q_tag`
  ADD CONSTRAINT `fk_q_quote_has_q_tag_q_quote1` FOREIGN KEY (`q_quote_q_id`) REFERENCES `q_quote` (`q_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_q_quote_has_q_tag_q_tag1` FOREIGN KEY (`q_tag_t_id`) REFERENCES `q_tag` (`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
