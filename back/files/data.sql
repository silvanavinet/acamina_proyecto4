
CREATE TABLE regions (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE countrys (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL UNIQUE,
	region int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (region) REFERENCES regions(id) ON DELETE CASCADE
);

CREATE TABLE citys (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL UNIQUE,
	country int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (country) REFERENCES countrys(id) ON DELETE CASCADE
);

CREATE TABLE companys (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	city int NOT NULL,
	dir VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	tel VARCHAR(30) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (city) REFERENCES citys(id) 
);

CREATE TABLE contacts (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	cargo VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	dir VARCHAR(30) NOT NULL,
	interes INT NOT NULL,
	compania INT NOT NULL,
	city INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (compania) REFERENCES companys(id), 
	FOREIGN KEY (city) REFERENCES citys(id) 
);

CREATE TABLE canales (
	id INT NOT NULL AUTO_INCREMENT,
	contacto INT NOT NULL,
	canal VARCHAR(30) NOT NULL,
	cuenta VARCHAR(30) NOT NULL,
	preferencia VARCHAR(30) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (contacto) REFERENCES contacts(id) ON DELETE CASCADE
);

CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL UNIQUE,
	perfil VARCHAR(30) NOT NULL,
	contrasena VARCHAR(200) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `perfil`, `contrasena`)
VALUES
	(1, 'admin', 'admin', 'admin@gmail.com', 'admin', '$2a$10$52vYJd3cXMT87jfn9jfVG.FvaiVA0KuS9tZGR1M7tkDWBElTnlvsu');
	(2, 'basico', 'basico', 'basico@gmail.com', 'basico', '$2a$10$oXtkRDZqYCGJ98fcDPYxCOYDPhxlcdhyz.u8k0sCSpmHhE6lM0YA6');


INSERT INTO `regions` (`id`, `name`)
VALUES
	(21, 'asia');

INSERT INTO `countrys` (`id`, `name`, `region`)
VALUES
	(11, 'china', 21),
	(12, 'japon', 21);

INSERT INTO `citys` (`id`, `name`, `country`)
VALUES
	(20, 'tokyo', 12),
	(21, 'kyoto', 12);

