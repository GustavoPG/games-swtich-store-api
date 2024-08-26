// favoritosModel.js

// Importa la configuración de la base de datos
import pool from "../../database/config.js";

// Función para agregar un favorito
export const addFavorite = async (favoriteData) => {
  const { id_usuario, id_publicacion, fecha_valoracion } = favoriteData;

  // Consulta SQL para insertar un favorito, asegurando que no exista previamente
  const query = `
      INSERT INTO favoritos (id_usuario, id_publicacion, fecha_valoracion)
      SELECT $1, $2, $3
      WHERE NOT EXISTS (
          SELECT 1 FROM favoritos WHERE id_usuario = $1 AND id_publicacion = $2
      );
  `;

  // Valores que se usarán en la consulta SQL
  const values = [id_usuario, id_publicacion, fecha_valoracion];

  try {
      const result = await pool.query(query, values);

      // Verifica si se insertó un nuevo registro
      if (result.rowCount > 0) {
          return { exists: false, status: 201, message: 'Ingreso exitoso' };
      } else {
          return { exists: true, status: 409, message: 'El juego ya está en la lista de deseos' };
      }
  } catch (error) {
      console.error("Error en la consulta SQL:", error.message);
      // Manejo de errores en la consulta SQL
      return { exists: false, status: 500, message: 'Error al agregar a favoritos' };
  }
};

// Función para encontrar un favorito por usuario y publicación
export const findFavoriteByUserAndPublication = async (id_usuario, id_publicacion) => {
  const query = `
      SELECT * FROM favoritos
      WHERE id_usuario = $1 AND id_publicacion = $2`;
  
  const values = [id_usuario, id_publicacion];
  const result = await pool.query(query, values);
  return result.rows.length > 0 ? result.rows[0] : false;
};

// Función para obtener todos los favoritos
export const getAllFavorites = async () => {
  const result = await pool.query('SELECT * FROM favoritos');
  return result.rows;
};

// Función para obtener todos los favoritos de un usuario
export const getAllFavoritesByUserId = async (id_usuario) => {
  const query = `
    SELECT f.id_favorito, f.id_usuario, f.id_publicacion, p.url_imagen_juego, p.titulo, p.descripcion, p.precio, p.stock, p.estado
    FROM favoritos f
    JOIN publicaciones p ON f.id_publicacion = p.id_publicacion
    WHERE f.id_usuario = $1;
  `;
  const result = await pool.query(query, [id_usuario]);
  return result.rows;
};

// Función para encontrar un favorito por su ID
export const findFavoriteById = async (id_favorito) => {
  const result = await pool.query('SELECT * FROM favoritos WHERE id_favorito = $1', [id_favorito]);
  return result.rows[0];
};

// Función para actualizar un favorito
export const updateFavorite = async (id_favorito, favoriteData) => {
  const { fecha_valoracion, valoracion } = favoriteData;

  // Consulta SQL para actualizar un registro en la tabla favoritos
  const query = `
    UPDATE favoritos
    SET fecha_valoracion = $1, valoracion = $2
    WHERE id_favorito = $3 RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [fecha_valoracion || new Date(), valoracion, id_favorito];
  
  // Ejecuta la consulta y devuelve la primera fila actualizada
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para eliminar un favorito por su ID y el ID del usuario
export const deleteFavorite = async (id_favorito, id_usuario) => {
  // Consulta SQL para eliminar un registro de la tabla favoritos
  const query = `
    DELETE FROM favoritos 
    WHERE id_favorito = $1 AND id_usuario = $2 
    RETURNING *;
  `;
  const values = [id_favorito, id_usuario];
  const result = await pool.query(query, values);
  return result.rows[0];  // Retorna la fila eliminada si existe
};
