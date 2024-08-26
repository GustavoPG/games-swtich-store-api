// carritoModel.js

// Importa la configuración de la base de datos
import pool from "../../database/config.js";

// Función para agregar un nuevo item al carrito
export const addCartItem = async (cartItemData) => {
  const { id_usuario, id_publicacion, fecha_transaccion, monto, estado } = cartItemData;

  // Consulta SQL para insertar un nuevo item en la tabla carrito
  const query = `
    INSERT INTO carrito (id_usuario, id_publicacion, fecha_transaccion, monto, estado)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [id_usuario, id_publicacion, fecha_transaccion || new Date(), monto, estado];
  
  // Ejecuta la consulta y devuelve el primer resultado
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para obtener todos los items del carrito
export const getAllCartItems = async () => {
  // Consulta SQL para obtener todos los registros de la tabla carrito
  const result = await pool.query('SELECT * FROM carrito');
  return result.rows;
};

// Función para buscar un item del carrito por el ID de usuario
export const findCartItemByUserId = async (id_usuario) => {
  // Consulta SQL para buscar un item en el carrito según el ID del usuario
  const result = await pool.query('SELECT * FROM carrito WHERE id_usuario = $1', [id_usuario]);
  return result.rows[0];
};

// Función para actualizar un item del carrito
export const updateCartItem = async (id_usuario, cartItemData) => {
  const { id_publicacion, fecha_transaccion, monto, estado } = cartItemData;

  // Consulta SQL para actualizar un registro en la tabla carrito
  const query = `
    UPDATE carrito
    SET id_publicacion = $1, fecha_transaccion = $2, monto = $3, estado = $4
    WHERE id_usuario = $5 RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [id_publicacion, fecha_transaccion || new Date(), monto, estado, id_usuario];
  
  // Ejecuta la consulta y devuelve el primer resultado actualizado
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para eliminar un item del carrito por el ID de usuario
export const deleteCartItem = async (id_usuario) => {
  // Consulta SQL para eliminar un registro de la tabla carrito según el ID del usuario
  const result = await pool.query('DELETE FROM carrito WHERE id_usuario = $1 RETURNING *', [id_usuario]);
  return result.rows[0];
};
