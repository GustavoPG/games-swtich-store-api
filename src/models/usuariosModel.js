// usuariosModel.js

// Importa la configuración de la base de datos y bcrypt para encriptar contraseñas
import pool from "../../database/config.js";
import bcrypt from 'bcryptjs';

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  const { nombre, apellido, email, contraseña, avatar, rol = 1 } = userData; // Desestructuramos los datos del usuario
  const fecha_registro = new Date(); // Establece la fecha de registro como la fecha actual
  const hashedPassword = await bcrypt.hash(contraseña, 10); // Encripta la contraseña antes de almacenarla

  // Consulta SQL para insertar un nuevo usuario
  const query = `
    INSERT INTO usuarios (nombre, apellido, email, contraseña, fecha_registro, avatar, rol)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  
  // Valores que se usarán en la consulta SQL
  const values = [nombre, apellido, email, hashedPassword, fecha_registro, avatar, rol];
  
  // Ejecuta la consulta e inserta el nuevo usuario
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Función para encontrar un usuario por su email
export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]); // Consulta SQL para buscar un usuario por email
  return result.rows[0];
};

// Función para encontrar un usuario por su ID
export const findUserById = async (id_usuario) => {
  try {
    console.log('Buscando usuario con ID:', id_usuario); // Muestra en consola el ID que se está buscando
    const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]); // Consulta SQL para buscar un usuario por ID
    console.log('Resultado de la consulta:', result.rows[0]); // Muestra en consola el resultado de la consulta
    return result.rows[0];
  } catch (error) {
    console.error('Error en la consulta de usuario:', error); // Muestra un error si la consulta falla
    throw error; 
  }
};

// Función para actualizar los datos de un usuario
export const updateUser = async (id_usuario, userData) => {
  const { nombre, apellido, email, avatar } = userData; // Desestructuramos los datos del usuario
  const query = `
    UPDATE usuarios
    SET nombre = $1, apellido = $2, email = $3, avatar = $4
    WHERE id_usuario = $6 RETURNING *`;
  
  const values = [nombre, apellido, email, avatar, rol, id_usuario]; // Valores que se usarán en la consulta SQL
  
  const result = await pool.query(query, values); // Ejecuta la consulta para actualizar el usuario
  return result.rows[0];
};

// Función para eliminar un usuario por su ID
export const deleteUser = async (id_usuario) => {
  const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id_usuario]); // Consulta SQL para eliminar un usuario
  return result.rows[0];
};

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM usuarios'); // Consulta SQL para obtener todos los usuarios
  return result.rows;
};
