CREATE DATABASE IF NOT EXISTS ontime;

USE ontime;

CREATE TABLE IF NOT EXISTS Plato
(
IdPlato int AUTO_INCREMENT primary key,
Nombre varchar (60) not null,
Imagen blob not null, 
Descripcion text not null,
Precio float,
Celiaco boolean,
Vegano boolean,
Kosher boolean
);

INSERT INTO Plato (Nombre, Descripcion, Precio, Celiaco, Vegano, Kosher) VALUES ('Sandwich de pollo', 'Pollo grillado con miel, limon, y mostaza de dijon, hongos salteados, cebolla caramelizada, cherry confitado con ajo y queso parmesano en pan de campo de molde', 9900, False, False, False);
