import { Router } from 'express';
import authenticated from '../../../middlewares/authenticated';
import { HandleRefreshToken } from './../../../controllers/auth';

const router = Router();

router.post('/', HandleRefreshToken);

export default router;
