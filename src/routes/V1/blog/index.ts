import { Router } from 'express';
import writer from './writer';
import editor from './editor';
import learner from './learner';

const router = Router();

router.use('/writer', writer);
router.use('/editor', editor);
router.use('/', learner);

export default router;
