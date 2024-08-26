// usuariosRouter.js
import { Router } from 'express';
import { createNewCategory, getCategories, getCategory, updateCategoryBd, deleteCategoryBd } from '../controllers/categoriasController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validateCategoryData } from '../middlewares/validateMiddleware.js';
import { reportTransaction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransaction);

router.post('/', validateCategoryData, createNewCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', validateCategoryData, updateCategoryBd);
router.delete('/:id', deleteCategoryBd);

export default router;
