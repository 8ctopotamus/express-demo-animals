DROP DATABASE IF EXISTS animals_db;
CREATE DATABASE animals_db;

USE animals_db;

CREATE TABLE animalTypes (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE animals (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  age INT,
  animalTypeId INT NOT NULL,
  hasOwner BOOLEAN DEFAULT false,
  PRIMARY KEY(id),
  FOREIGN KEY (animalTypeId)
  REFERENCES animalTypes(id)
);