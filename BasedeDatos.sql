impo


CREATE TABLE Plato
(
IdPlato int primary key not null,
Nombre varchar (60) not null,
Imagen blob not null, 
Descripcion text not null,
Precio float,
Celiaco boolean,
Vegano boolean,
Kosher boolean
);

