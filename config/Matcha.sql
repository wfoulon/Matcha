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
    password VARCHAR(255) NOT NULL
);
