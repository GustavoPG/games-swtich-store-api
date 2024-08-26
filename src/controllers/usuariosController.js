// usuariosController.js

// Importa las funciones del modelo de usuarios y las librerías necesarias
import { createUser, findUserByEmail, findUserById, updateUser, deleteUser, getAllUsers } from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
      const users = await getAllUsers(); // Obtiene todos los usuarios desde la base de datos
      res.json(users); // Devuelve los usuarios en formato JSON
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' }); // Maneja errores al obtener usuarios
  }
};

// Controlador para crear un nuevo usuario
export const createNewUser = async (req, res) => {
  try {
    console.log('Datos recibidos en createNewUser:', req.body);
    const user = await createUser(req.body); // Crea un nuevo usuario con los datos proporcionados
    res.status(201).json(user); // Devuelve el usuario creado
  } catch (error) {
    console.error('Error al crear usuario:', error);  
    res.status(400).json({ error: 'Error al crear usuario' }); // Maneja errores al crear el usuario
  }
};

// Controlador para el inicio de sesión de un usuario
export const loginUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await findUserByEmail(email); // Busca el usuario por su email

    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' }); // Devuelve error si las credenciales no son válidas
    }

    const token = jwt.sign({ id_usuario: user.id_usuario, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Genera un token JWT
    res.json({ 
      token,
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      avatar: user.avatar,
      rol: user.rol
     }); // Devuelve el token y los datos del usuario
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' }); // Maneja errores durante el login
  }
};

// Controlador para obtener un usuario por su ID
export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id); // Busca el usuario por su ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Devuelve error si el usuario no es encontrado
    }
    res.json(user); // Devuelve el usuario encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' }); // Maneja errores al obtener el usuario
  }
};

// Controlador para obtener el perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const { id_usuario } = req.user; 
    console.log('ID de usuario extraído del token:', id_usuario);

    const user = await findUserById(id_usuario); // Busca el usuario por el ID en el token
    console.log('Usuario encontrado:', user);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Devuelve error si el usuario no es encontrado
    }
    res.json(user); // Devuelve el perfil del usuario
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' }); // Maneja errores al obtener el perfil
  }
};

// Controlador para obtener el perfil de un usuario por su ID
export const getUserProfile = async (req, res) => {
  try {
    const { id_usuario } = req.user;
    const user = await findUserById(id_usuario); // Busca el usuario por el ID en el token
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Devuelve error si el usuario no es encontrado
    }
    res.json(user); // Devuelve el perfil del usuario
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' }); // Maneja errores al obtener el perfil
  }
};

// Controlador para actualizar un usuario
export const updateUserBd = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body); // Actualiza el usuario con los datos proporcionados
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Devuelve error si el usuario no es encontrado
    }
    res.json(user); // Devuelve el usuario actualizado
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' }); // Maneja errores al actualizar el usuario
  }
};

// Controlador para eliminar un usuario
export const deleteUserBd = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id); // Elimina el usuario por su ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Devuelve error si el usuario no es encontrado
    }
    res.json({ message: 'Usuario eliminado correctamente' }); // Devuelve un mensaje de éxito al eliminar
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' }); // Maneja errores al eliminar el usuario
  }
};
