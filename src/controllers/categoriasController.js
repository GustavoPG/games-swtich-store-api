// categoriasController.js

// Importa funciones desde el modelo categoriasModel
import { addCategory, getAllCategories, findCategoryById, updateCategory, deleteCategory } from '../models/categoriasModel.js';

// Controlador para crear una nueva categoría
export const createNewCategory = async (req, res) => {
  try {
    const category = await addCategory(req.body); // Llama a la función para agregar una nueva categoría
    res.status(201).json(category); // Devuelve la categoría creada con un código de estado 201
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la categoría' }); // Devuelve un error si algo falla
  }
};

// Controlador para obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories(); // Llama a la función para obtener todas las categorías
    res.json(categories); // Devuelve las categorías obtenidas
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' }); // Devuelve un error si algo falla
  }
};

// Controlador para obtener una categoría específica por su ID
export const getCategory = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id); // Busca la categoría por su ID
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' }); // Devuelve un error si no se encuentra la categoría
    }
    res.json(category); // Devuelve la categoría encontrada
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' }); // Devuelve un error si algo falla
  }
};

// Controlador para actualizar una categoría
export const updateCategoryBd = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body); // Actualiza la categoría con los datos proporcionados
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' }); // Devuelve un error si no se encuentra la categoría
    }
    res.json(category); // Devuelve la categoría actualizada
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la categoría' }); // Devuelve un error si algo falla
  }
};

// Controlador para eliminar una categoría
export const deleteCategoryBd = async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id); // Elimina la categoría por su ID
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' }); // Devuelve un error si no se encuentra la categoría
    }
    res.json({ message: 'Categoría eliminada correctamente' }); // Devuelve un mensaje de éxito al eliminar
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' }); // Devuelve un error si algo falla
  }
};
