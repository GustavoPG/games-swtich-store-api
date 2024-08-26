// publicacionesController.js

// Importa funciones desde el modelo publicacionesModel
import { createPublication, getAllPublications, findPublicationById, updatePublication, deletePublication } from '../models/publicacionesModel.js';

// Controlador para crear una nueva publicación
export const createNewPublication = async (req, res) => {
  try {
    const publication = await createPublication(req.body); // Crea una nueva publicación con los datos recibidos
    res.status(201).json(publication); // Devuelve la publicación creada
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la publicación' }); // Maneja errores durante la creación
  }
};

// Controlador para obtener todas las publicaciones
export const getPublications = async (req, res) => {
  try {
    const publications = await getAllPublications(); // Obtiene todas las publicaciones
    res.json(publications); // Devuelve las publicaciones obtenidas
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' }); // Maneja errores durante la obtención
  }
};

// Controlador para obtener una publicación específica por su ID
export const getPublication = async (req, res) => {
  try {
    const publication = await findPublicationById(req.params.id); // Busca la publicación por su ID
    if (!publication) {
      return res.status(404).json({ error: 'Publicación no encontrada' }); // Devuelve un error si no se encuentra la publicación
    }
    res.json(publication); // Devuelve la publicación encontrada
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' }); // Maneja errores durante la obtención
  }
};

// Controlador para actualizar una publicación
export const updatePublicationBd = async (req, res) => {
  try {
    const publication = await updatePublication(req.params.id, req.body); // Actualiza la publicación con los datos proporcionados
    if (!publication) {
      return res.status(404).json({ error: 'Publicación no encontrada' }); // Devuelve un error si no se encuentra la publicación
    }
    res.json(publication); // Devuelve la publicación actualizada
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la publicación' }); // Maneja errores durante la actualización
  }
};

// Controlador para eliminar una publicación
export const deletePublicationBd = async (req, res) => {
  try {
      const publication = await deletePublication(req.params.id); // Elimina la publicación por su ID
      if (!publication) {
          return res.status(404).json({ error: 'Publicación no encontrada' }); // Devuelve un error si no se encuentra la publicación
      }
      res.json({ message: 'Publicación eliminada correctamente' }); // Devuelve un mensaje de éxito al eliminar
  } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la publicación' }); // Maneja errores durante la eliminación
  }
};
