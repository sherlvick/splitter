CREATE DATABASE splitter;
USE splitter;

CREATE TABLE user (
  googleId VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  displayName VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255),
  profileImage VARCHAR(500),
  email VARCHAR(500) NOT NULL 
);
