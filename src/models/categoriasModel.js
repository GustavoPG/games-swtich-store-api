// categoriasModel.js

// Importa la configuración de la base de datos
import pool from "../../database/config.js";

// Función para agregar una nueva categoría
export const addCategory = async (categoryData) => {
  const { nombre } = categoryData;

  // Consulta SQL para insertar una nueva categoría en la tabla categorias
  const query = `
    INSERT INTO categorias (nombre)
    VALUES ($1) RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [nombre];
  
  // Ejecuta la consulta y devuelve la primera fila insertada
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para obtener todas las categorías
export const getAllCategories = async () => {
  // Consulta SQL para obtener todos los registros de la tabla categorias
  const result = await pool.query('SELECT * FROM categorias');
  return result.rows;
};

// Función para buscar una categoría por su ID
export const findCategoryById = async (id_categoria) => {
  // Consulta SQL para buscar una categoría según su ID
  const result = await pool.query('SELECT * FROM categorias WHERE id_categoria = $1', [id_categoria]);
  return result.rows[0];
};

// Función para actualizar una categoría
export const updateCategory = async (id_categoria, categoryData) => {
  const { nombre } = categoryData;

  // Consulta SQL para actualizar un registro en la tabla categorias
  const query = `
    UPDATE categorias
    SET nombre = $1
    WHERE id_categoria = $2 RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [nombre, id_categoria];
  
  // Ejecuta la consulta y devuelve la primera fila actualizada
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para eliminar una categoría por su ID
export const deleteCategory = async (id_categoria) => {
  // Consulta SQL para eliminar un registro de la tabla categorias según su ID
  const result = await pool.query('DELETE FROM categorias WHERE id_categoria = $1 RETURNING *', [id_categoria]);
  return result.rows[0];
};
