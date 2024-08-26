// validateMiddleware.js

// Middleware para validar los parámetros de inicio de sesión
export const validparameters = (req, res, next) => {
  const { email, contraseña } = req.body;
  // Verifica que el email y la contraseña estén presentes
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  next(); // Si todo está bien, continúa con la siguiente función middleware
};

// Middleware para validar los parámetros al crear o actualizar un usuario
export const validateParametersUser = (req, res, next) => {
  const { nombre, apellido, email, contraseña, avatar } = req.body;
  console.log('Datos recibidos en el middleware:', { nombre, apellido, email, contraseña, avatar });

  // Validaciones para la creación de un nuevo usuario (método POST)
  if (req.method === 'POST') {
    if (!nombre || !apellido || !email || !contraseña || !avatar) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
  }

  // Validaciones para la actualización de un usuario existente (método PUT)
  if (req.method === 'PUT') {
    if (!nombre || !apellido || !email || !avatar) {
      return res.status(400).json({ error: 'Nombre, Apellido, Email y Avatar son requeridos' });
    }
  }

  next(); // Si todas las validaciones pasan, continúa con la siguiente función middleware
};

// Middleware para validar los datos de una publicación (juego)
export const validatePublicationData = (req, res, next) => {
  const { url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria } = req.body;
  
  // Verifica que todos los campos necesarios estén presentes
  if (!titulo || !descripcion || !precio || !stock || !estado || !id_categoria) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  // Verifica que el estado sea válido (disponible o vendido)
  if (estado !== 'disponible' && estado !== 'vendido') {
    return res.status(400).json({ error: 'El estado debe ser "disponible" o "vendido"' });
  }
  
  next(); // Si todo está bien, continúa con la siguiente función middleware
};

// Middleware para validar los datos de un favorito
export const validateFavoriteData = (req, res, next) => {
  const { id_usuario, id_publicacion, valoracion } = req.body;

  // Verifica que todos los campos necesarios estén presentes y que la valoración sea booleana
  if (!id_usuario || !id_publicacion || typeof valoracion !== 'boolean') {
    return res.status(400).json({ error: 'Todos los campos son requeridos y la valoración debe ser un valor booleano' });
  }

  next(); // Si todo está bien, continúa con la siguiente función middleware
};

// Middleware para validar los datos de una categoría
export const validateCategoryData = (req, res, next) => {
  const { nombre } = req.body;

  // Verifica que el nombre de la categoría esté presente, sea una cadena y no esté vacío
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'Nombre de la categoría es requerido y debe ser una cadena no vacía' });
  }

  next(); // Si todo está bien, continúa con la siguiente función middleware
};

// Middleware para validar los datos de un item del carrito
export const validateCartItemData = (req, res, next) => {
  const { id_publicacion, monto, estado } = req.body;

  // Verifica que todos los campos necesarios estén presentes
  if (!id_publicacion || !monto || !estado) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Verifica que el estado sea válido (pendiente, completado o cancelado)
  if (estado !== 'pendiente' && estado !== 'completado' && estado !== 'cancelado') {
    return res.status(400).json({ error: 'El estado debe ser "pendiente", "completado" o "cancelado"' });
  }

  next(); // Si todo está bien, continúa con la siguiente función middleware
};
