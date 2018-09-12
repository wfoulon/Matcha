CREATE DATABASE IF NOT EXISTS matcha DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `matcha`;

CREATE TABLE IF NOT EXISTS `users`(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    fname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age VARCHAR(255) NULL,
    sexual_orientation VARCHAR(255) NULL,
    gender VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    confirmation INT(1) NOT NULL DEFAULT 0,
    `image` VARCHAR(300) NULL,
    score INT NULL DEFAULT 5,
    bio VARCHAR(255) NULL,
    lat VARCHAR(255) NULL,
    ln VARCHAR(255) NULL,
    connection DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `interest` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    interest VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS `like` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    `match` INT NOT NULL,
    status INT(1) NULL DEFAULT 0,
    token_room VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `image` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    post_url VARCHAR(300) NULL
) 

/* CREATE TABLE IF NOT EXISTS `message` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    match INT NOT NULL,
    text VARCHAR(255),
    creation_date DATETIME,
    chat_id VARCHAR(255)
); */

/* CREATE TABLE `notif` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uid` INT NOT NULL,
  `uid_receiver` INT NOT NULL,
  `type` INT NOT NULL,
  `seen` INT DEFAULT NULL
) */
