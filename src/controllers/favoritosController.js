// favoritosController.js

// Importa funciones desde el modelo favoritosModel
import { addFavorite, getAllFavorites, findFavoriteById, updateFavorite, deleteFavorite, 
  findFavoriteByUserAndPublication, getAllFavoritesByUserId  } from '../models/favoritosModel.js';

// Controlador para crear un nuevo favorito
export const createNewFavorite = async (req, res) => {
const { id_publicacion } = req.body; // Obtiene id_publicacion del cuerpo de la solicitud
const id_usuario = req.user.id_usuario; // Obtiene id_usuario desde el token

if (!id_usuario || !id_publicacion) {
return res.status(400).json({ error: 'Datos incompletos' }); // Verifica que los datos necesarios estén presentes
}

try {
console.log("Datos recibidos para agregar a favoritos:", { id_usuario, id_publicacion });
const result = await addFavorite({
  id_usuario,
  id_publicacion,
  fecha_valoracion: new Date(), // Establece la fecha de valoración como la fecha actual
});

console.log("Resultado de la operación:", result);

if (result && typeof result.exists !== 'undefined') {
  return res.status(result.status).json({ message: result.message }); // Devuelve el resultado de la operación
} else {
  throw new Error('Respuesta inesperada del servidor'); // Lanza un error si el resultado es inesperado
}
} catch (error) {
console.error("Error al agregar a favoritos:", error.message);
return res.status(500).json({ error: 'Error inesperado al agregar a favoritos' }); // Maneja errores durante la operación
}
};

// Controlador para obtener los favoritos del usuario autenticado
export const getFavorites = async (req, res) => {
const id_usuario = req.user.id_usuario;  // Obtiene id_usuario desde el token
try {
const favorites = await getAllFavoritesByUserId(id_usuario); // Llama a la función para obtener los favoritos por id_usuario
res.json(favorites); // Devuelve los favoritos obtenidos
} catch (error) {
res.status(500).json({ error: 'Error al obtener los favoritos' }); // Maneja errores durante la operación
}
};

// Controlador para obtener un favorito específico por su ID
export const getFavorite = async (req, res) => {
try {
const favorite = await findFavoriteById(req.params.id); // Busca el favorito por su ID
if (!favorite) {
return res.status(404).json({ error: 'Favorito no encontrado' }); // Devuelve un error si no se encuentra el favorito
}
res.json(favorite); // Devuelve el favorito encontrado
} catch (error) {
res.status(500).json({ error: 'Error al obtener el favorito' }); // Maneja errores durante la operación
}
};

// Controlador para actualizar un favorito
export const updateFavoriteBd = async (req, res) => {
try {
const favorite = await updateFavorite(req.params.id, req.body); // Actualiza el favorito con los datos proporcionados
if (!favorite) {
return res.status(404).json({ error: 'Favorito no encontrado' }); // Devuelve un error si no se encuentra el favorito
}
res.json(favorite); // Devuelve el favorito actualizado
} catch (error) {
res.status(400).json({ error: 'Error al actualizar el favorito' }); // Maneja errores durante la operación
}
};

// Controlador para eliminar un favorito
export const deleteFavoriteBd = async (req, res) => {
const id_favorito = req.params.id; // Obtiene id_favorito desde los parámetros de la solicitud
const id_usuario = req.user.id_usuario; // Obtiene id_usuario desde el token

try {
const result = await deleteFavorite(id_favorito, id_usuario); // Elimina el favorito por su ID
if (!result) {
return res.status(404).json({ error: 'Favorito no encontrado' }); // Devuelve un error si no se encuentra el favorito
}
res.json({ message: 'Favorito eliminado correctamente' }); // Devuelve un mensaje de éxito al eliminar
} catch (error) {
res.status(500).json({ error: 'Error al eliminar el favorito' }); // Maneja errores durante la operación
}
};
