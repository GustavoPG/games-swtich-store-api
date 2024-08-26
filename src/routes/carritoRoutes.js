// usuariosRouter.js
import { Router } from 'express';
import { createNewCartItem, getCartItems, getCartItem, updateCartItemBd, deleteCartItemBd } from '../controllers/carritoController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validateCartItemData } from '../middlewares/validateMiddleware.js';
import { reportTransaction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransaction);

router.post('/carrito', validateCartItemData, createNewCartItem);
router.get('/carrito', getCartItems);
router.get('/carrito/:id_usuario', getCartItem);
router.put('/carrito/:id_usuario', validateCartItemData, updateCartItemBd);
router.delete('/carrito/:id_usuario', deleteCartItemBd);

export default router;
