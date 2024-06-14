import { Router } from 'express';
import validator from '../validators/validator';
import * as Controllers from '../controllers/controller';

const router = Router();

router.get('/', Controllers.getAll);
router.get('/search', validator, Controllers.searchQuery);

export default router;