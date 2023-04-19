import { Router } from 'express';
import { HandleLogout } from './../../../controllers/auth';

const router = Router();

router.delete('/', HandleLogout);

export default router;
