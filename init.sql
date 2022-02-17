CREATE DATABASE IF NOT EXISTS forum;

USE forum;

CREATE TABLE IF NOT EXISTS `user` (
    `mail` VARCHAR(51) UNIQUE NOT NULL,
    `password` VARCHAR(51) NOT NULL,
    `name` VARCHAR(21) NOT NULL,
    `surname` VARCHAR(21) NOT NULL,
    `country` ENUM('Italy','France', 'Germany', 'USA', 'Spain', 'England'),
    PRIMARY KEY (mail)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_access` (
    `token` VARCHAR(128) UNIQUE NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `expired_date` TIMESTAMP NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (token)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `post` (
    `post_id` VARCHAR(129) UNIQUE NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `topic` ENUM('Music', 'Work', 'Food', 'Love', 'Nature', 'Sport', 'Money', 'Shopping', 'Television'),
    `title` VARCHAR(31) NOT NULL,
    `description` TEXT NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (post_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `like_content` (
    `id` INTEGER AUTO_INCREMENT NOT NULL,
    `post_id` VARCHAR(129) NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UniqueLike UNIQUE (post_id,user_id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `comment_content` (
    `id` INTEGER AUTO_INCREMENT NOT NULL,
    `creation_date` TIMESTAMP NOT NULL,
    `description` TEXT NOT NULL,
    `post_id` VARCHAR(129) NOT NULL,
    `user_id` VARCHAR(51) NOT NULL,
    PRIMARY KEY (id) 
)ENGINE=InnoDB;