import { Router } from 'express';
import writer from './writer';
import editor from './editor';
import learner from './learner';
import blogs from './blogs';

const router = Router();

router.use('/', learner);
router.use('/writer', writer);
router.use('/editor', editor);
router.use('/', blogs);

export default router;
