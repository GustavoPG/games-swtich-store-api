CREATE DATABASE games_switch_store;

\c games_switch_store;

CREATE TABLE usuarios (
id_usuario SERIAL PRIMARY KEY,
nombre VARCHAR(100),
apellido VARCHAR(100),
email VARCHAR(100) UNIQUE,
contraseña VARCHAR(60),
fecha_registro DATE,
avatar VARCHAR(250),
rol SMALLINT CHECK (rol IN (0, 1)) -- 0 para cliente, 1 para administrador
);

CREATE TABLE categorias (
id_categoria SERIAL PRIMARY KEY,
nombre VARCHAR(50)
);

CREATE TABLE publicaciones (
id_publicacion SERIAL PRIMARY KEY,
id_usuario INT REFERENCES usuarios(id_usuario),
url_imagen_juego VARCHAR(250),
titulo VARCHAR(250),
descripcion TEXT,
precio DECIMAL(10, 2),
stock INT,
estado VARCHAR(10) CHECK (estado IN ('disponible', 'vendido')),
id_categoria INT REFERENCES categorias(id_categoria)
);

CREATE TABLE carrito (
id_usuario INT PRIMARY KEY REFERENCES usuarios(id_usuario),
id_publicacion INT REFERENCES publicaciones(id_publicacion),
fecha_transaccion TIMESTAMPTZ,
monto DECIMAL(10, 2),
estado VARCHAR(20) CHECK (estado IN ('pendiente', 'completado', 'cancelado'))
);

CREATE TABLE favoritos (
id_favorito SERIAL PRIMARY KEY,
id_usuario INT REFERENCES usuarios(id_usuario),
id_publicacion INT REFERENCES publicaciones(id_publicacion),
fecha_valoracion DATE,
valoracion BOOLEAN
);

INSERT INTO categorias(nombre)
VALUES
('Aventuras'), 
('Multijugador'),
('Acción'),
('Un Jugador'),
('Deporte'),
('Estrategia'),
('Lucha');

insert into usuarios(nombre, apellido, email, contraseña, fecha_registro, avatar, rol)
values
('Juan', 'Perez', 'juan.perez@gmail.com', '123456', '10-10-2000','https://img.freepik.com/premium-psd/3d-illustration-business-man-with-glasses_23-2149436193.jpg?w=740', 0),
('Pedro', 'Gonzalez', 'pedro.gonzalez@gmail.com', '123456', '10-05-2000', 'https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=740&t=st=1723169578~exp=1723170178~hmac=20e933b2709b73b1288f407212d9b4d0440b541ab2428b04ac5c74c0a7886da9',1);


INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000068688/1c5583f6bbce5bccdc923c25c35ba8f42128b55df84f4a2fbeea74b6d1d1516e', 'Super Mario Bros Wonder', '¡El estilo de juego clásico de los juegos de Mario será toda una locura con la adición de la Flor Maravilla en el juego Super Mario Bros. Wonder!.', 58990, 9,'disponible', 1);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000045182/74fb568c43f9c43895db89d4ebb2b510894de7141b066b953aebda427a46af87', 'NieR:Automata The End of YoRHa Edition', 'NieR:Automata The End of YoRHa Edition es la versión, del aclamado y premiado juego de rol y acción postapocalíptico.', 56000, 5,'disponible', 3);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000042924/c7e6839975afd46893274cf7cfdb63b39a54d6f700938bcd1c8849ac66755d00', 'Metroid Dread', 'Después de investigar una misteriosa transmisión del planeta ZDR, Samus se enfrenta a un enemigo que la atrapa en este misterioso mundo.', 58990, 7,'disponible', 3);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000034439/ccb69a8bf2746b2dc0a9b11a9e48c9893baa1631486326f0d681b7a36385221f', 'Super Mario™ 3D World + Bowser’s Fury', 'Multiplica la diversión al formar un equipo o compitiendo con tus amigos mediante el juego local  o tambien en línea.', 48990, 1,'disponible', 1);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000046405/a59d040ba1c59da35da603df012d1c18d00a36c55981c8b620cec93b6bfa3576', 'Kirby and the Forgotten Land', 'Desplázate flotando en una nueva aventura como Kirby, la poderosa bola rosada. Explora y descubre un misterioso mundo.', 48990, 2,'disponible', 1);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58', 'The Legend of Zelda: Breath of the Wild', 'Olvida todo lo que sabes acerca de los juegos de la serie The Legend of Zelda. Explora y descubre un mundo lleno de aventuras.', 48990, 8,'disponible', 1);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000049936/a2f2110d63e18a774199c31dceb310a562b0d8d072c7b4a92dd4faa36f1bfc71', 'Mario Strikers: Battle League', 'Les presentamos strike, un deporte de 5 contra 5 inspirado en el fútbol, ¡así que haz lo que tengas que hacer para conseguir la victoria!.', 9999, 2,'disponible', 5);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000063810/3c3dbf6706064dd82bd56a288f0f771d91e19f5a03444c181a813a74c341487b', 'NBA 2K24 Edición Kobe Bryant', 'Arma tu equipo y vive el baloncesto en NBA 2K24. Disfruta una experiencia con opciones ilimitadas de MyPLAYER, en MyCAREER.', 31500, 3,'disponible', 5);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000066930/f66a8e393d787e9202e6eb6723447948f2c16e675c0b4779c8359669f49d0387', 'Attack Strategy - Battle Simulator Accurate', '¡Embárcate en una aventura épica de estrategia! Con 12 niveles únicos y desafiantes, tu destreza estratégica se pondrá a prueba.', 25500, 3,'disponible', 6);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000003622/e9699e4dc2d99af796a396b18c43bee39ba7742ab3c9aef2b5d6a880714ea528', 'Street Fighter 30th Anniversary Collection', 'Celebra el legado histórico de Street Fighter con la colección de aniversario. Esta increíble colección de 12 títulos de Street Fighter', 10500, 9,'disponible', 7);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/software/switch/70010000010192/c7d855443d9ed9d8aa7638f548044a2987c7f22a6dab3136916fcc811039a64b', 'Fornite', 'Sé la última persona en pie en Batalla campal, explora y sobrevive en LEGO Fortnite, deja atrás a tus rivales en Rocket Racing o sé la estrella de Fortnite Festival.', 0, 9,'disponible', 6);
INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
VALUES 
(1,'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000042351/875a656d7caf7c1a1dec74522943fcf06eb700fa8ccc94cd36b4c3c192f29109', 'Teenage Mutant Ninja Turtles: The Collection', 'Teenage Mutant Ninja Turtles: The Cowabunga Collection reúne trece juegos clásicos de TMNT de Konami en un increíble paquete.', 56000, 10,'disponible', 1);


