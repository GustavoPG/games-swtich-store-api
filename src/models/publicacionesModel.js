// publicacionesModel.js

// Importa la configuración de la base de datos
import pool from "../../database/config.js";

// Función para crear una nueva publicación
export const createPublication = async (publicationData) => {
  const { url_imagen_juego, titulo, descripcion, precio, stock, id_categoria } = publicationData;
  
  // Consulta SQL para insertar una nueva publicación
  const query = `
    INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [3, url_imagen_juego, titulo, descripcion, Number(precio), Number(stock), 'disponible', Number(id_categoria)];

  // Ejecuta la consulta e inserta la nueva publicación
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para obtener todas las publicaciones
export const getAllPublications = async () => {
  // Consulta SQL para seleccionar todas las publicaciones
  const result = await pool.query('SELECT * FROM publicaciones');
  return result.rows;
};

// Función para encontrar una publicación por su ID
export const findPublicationById = async (id_publicacion) => {
  // Consulta SQL que une las tablas publicaciones y categorias para obtener detalles completos
  const query = `
    SELECT a.id_publicacion, a.id_usuario, a.url_imagen_juego, a.titulo, a.descripcion, a.precio, a.stock, a.estado, a.id_categoria, b.nombre as categoria
    FROM publicaciones a
    JOIN categorias b ON a.id_categoria = b.id_categoria
    WHERE a.id_publicacion = $1;
  `;
  const result = await pool.query(query, [id_publicacion]);
  return result.rows[0];
};

// Función para actualizar una publicación existente
export const updatePublication = async (id_publicacion, publicationData) => {
  const { url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria } = publicationData;

  // Consulta SQL para actualizar los detalles de una publicación
  const query = `
    UPDATE publicaciones
    SET url_imagen_juego = $1, titulo = $2, descripcion = $3, precio = $4, stock = $5, estado = $6, id_categoria = $7
    WHERE id_publicacion = $8 RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria, id_publicacion];
  
  // Ejecuta la consulta y devuelve la fila actualizada
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para eliminar una publicación por su ID
export const deletePublication = async (id_publicacion) => {
  // Consulta SQL para eliminar una publicación por su ID
  const result = await pool.query('DELETE FROM publicaciones WHERE id_publicacion = $1 RETURNING *', [id_publicacion]);
  return result.rows[0];
};
