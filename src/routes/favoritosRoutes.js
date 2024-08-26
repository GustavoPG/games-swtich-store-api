// favoritosRouter.js
import { Router } from 'express';
import { createNewFavorite, getFavorites, getFavorite, updateFavoriteBd, deleteFavoriteBd } from '../controllers/favoritosController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validateFavoriteData } from '../middlewares/validateMiddleware.js';
import { reportTransaction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransaction);

router.post('/', validateToken, createNewFavorite);
router.get('/', validateToken, getFavorites);
router.get('/favoritos/:id', getFavorite);
router.put('/favoritos/:id', validateFavoriteData, updateFavoriteBd);
router.delete('/:id', validateToken, deleteFavoriteBd);

export default router;
