// usuariosRouter.js
import { Router } from 'express';
import { createNewPublication, getPublications, getPublication, updatePublicationBd, deletePublicationBd } from '../controllers/publicacionesController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validatePublicationData } from '../middlewares/validateMiddleware.js';
import { reportTransaction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransaction);

router.post('/', validateToken, createNewPublication);
router.get('/', getPublications);
router.get('/:id', getPublication);
router.put('/:id', validateToken, updatePublicationBd);
router.delete('/:id', validateToken, deletePublicationBd);

export default router;
