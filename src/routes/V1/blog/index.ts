import { Router } from 'express';
import writer from './writer';

const router = Router();

router.use('/writer', writer);

export default router;
