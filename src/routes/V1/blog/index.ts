import { Router } from 'express';
import writer from './writer';
import editor from './editor';

const router = Router();

router.use('/writer', writer);
router.use('/editor', editor);

export default router;
