// carritoController.js

// Importa funciones desde el modelo carritoModel
import { addCartItem, getAllCartItems, findCartItemByUserId, updateCartItem, deleteCartItem } from '../models/carritoModel.js';

// Controlador para crear un nuevo ítem en el carrito
export const createNewCartItem = async (req, res) => {
  try {
    const cartItem = await addCartItem(req.body); // Llama a la función para agregar un ítem al carrito
    res.status(201).json(cartItem); // Devuelve el ítem creado con un código de estado 201
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el item al carrito' }); // Devuelve un error si algo falla
  }
};

// Controlador para obtener todos los ítems del carrito
export const getCartItems = async (req, res) => {
  try { 
    const cartItems = await getAllCartItems(); // Llama a la función para obtener todos los ítems del carrito
    res.json(cartItems); // Devuelve los ítems obtenidos
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items del carrito' }); // Devuelve un error si algo falla
  }
};

// Controlador para obtener un ítem específico del carrito por el ID del usuario
export const getCartItem = async (req, res) => {
  try {
    const cartItem = await findCartItemByUserId(req.params.id_usuario); // Busca el ítem del carrito por ID de usuario
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' }); // Devuelve un error si no se encuentra el ítem
    }
    res.json(cartItem); // Devuelve el ítem encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el item del carrito' }); // Devuelve un error si algo falla
  }
};

// Controlador para actualizar un ítem del carrito
export const updateCartItemBd = async (req, res) => {
  try {
    const cartItem = await updateCartItem(req.params.id_usuario, req.body); // Actualiza el ítem del carrito con los datos proporcionados
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' }); // Devuelve un error si no se encuentra el ítem
    }
    res.json(cartItem); // Devuelve el ítem actualizado
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el item del carrito' }); // Devuelve un error si algo falla
  }
};

// Controlador para eliminar un ítem del carrito
export const deleteCartItemBd = async (req, res) => {
  try {
    const cartItem = await deleteCartItem(req.params.id_usuario); // Elimina el ítem del carrito por ID de usuario
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' }); // Devuelve un error si no se encuentra el ítem
    }
    res.json({ message: 'Item del carrito eliminado correctamente' }); // Devuelve un mensaje de éxito al eliminar
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el item del carrito' }); // Devuelve un error si algo falla
  }
};
