//index.js
import express from 'express';
import cors from 'cors';
//import { logger } from 'logger-express';

// Rutas
import usuariosRoutes from './src/routes/usuariosRoutes.js';
import favoritosRoutes from './src/routes/favoritosRoutes.js';
import categoriasRoutes from './src/routes/categoriasRoutes.js';
import carritoRoutes from './src/routes/carritoRoutes.js';
import publicacionesRoutes from './src/routes/publicacionesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
//app.use(cors({
//  origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
//  credentials: true
//}));

//app.use(logger());

// Configura las rutas
app.use('/usuarios', usuariosRoutes);  // Rutas relacionadas con usuarios
app.use('/favoritos', favoritosRoutes);  // Rutas relacionadas con favoritos
app.use('/categorias', categoriasRoutes);  // Rutas relacionadas con categorías
app.use('/carrito', carritoRoutes);  // Rutas relacionadas con carrito
app.use('/publicaciones', publicacionesRoutes);  // Rutas relacionadas con publicaciones


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server on: http://localhost:${PORT}`);
    });
  }

//app.listen(PORT, console.log(`Server on: http://localhost:${PORT}`));

export default app;