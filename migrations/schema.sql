CREATE TABLE user (
  googleId VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  displayName VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255),
  profileImage VARCHAR(500),
  email VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE `groups` (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  displayName VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  balance FLOAT NOT NULL DEFAULT 0, 
  g_type ENUM('individual','group') NOT NULL DEFAULT 'group' 
);

CREATE TABLE users_groups (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    group_id int NOT NULL,
    role ENUM('admin','general') NOT NULL DEFAULT 'general',
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(googleId),
    FOREIGN KEY (group_id) REFERENCES `groups`(id),
    PRIMARY KEY (id)
);

CREATE TABLE expenses (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    total_amount FLOAT NOT NULL,
    distribution_type ENUM('equal','percentage','share','unequal') NOT NULL DEFAULT 'equal',
    group_id int NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255),
    FOREIGN KEY (group_id) REFERENCES `groups`(id),
    FOREIGN KEY (created_by) REFERENCES user(googleId),
    FOREIGN KEY (updated_by) REFERENCES user(googleId),
    PRIMARY KEY (id)
);

CREATE TABLE expense_paid_by (
  id INT NOT NULL AUTO_INCREMENT,
  expense_id INT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  amount FLOAT NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES user(googleId),
  FOREIGN KEY (expense_id) REFERENCES expenses(id),
  PRIMARY KEY (id)
);

CREATE TABLE expense_split (
  id INT NOT NULL AUTO_INCREMENT,
  expense_id INT NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  amount FLOAT NOT NULL, 
  distribution_value FLOAT,
  FOREIGN KEY (user_id) REFERENCES user(googleId),
  FOREIGN KEY (expense_id) REFERENCES expenses(id),
  PRIMARY KEY (id)
);

CREATE TABLE balances (
  id INT NOT NULL AUTO_INCREMENT,
  from_user VARCHAR(255) NOT NULL,
  to_user VARCHAR(255) NOT NULL,
  balance FLOAT NOT NULL DEFAULT 0, 
  group_id int NOT NULL,
  FOREIGN KEY (from_user) REFERENCES user(googleId),
  FOREIGN KEY (to_user) REFERENCES user(googleId),
  FOREIGN KEY (group_id) REFERENCES `groups`(id),
  PRIMARY KEY (id)
);

CREATE TABLE balance_relation (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  balances_id INT NOT NULL,
  isPayer BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(googleId),
  FOREIGN KEY (balances_id) REFERENCES balances(id),
  PRIMARY KEY (id)
);