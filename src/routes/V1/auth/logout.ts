import { Router } from 'express';
import authenticated from '../../../middlewares/authenticated';
import { HandleLogout } from './../../../controllers/auth';

const router = Router();

// ----------- CHECK IF USER IS AUTHENTICATED -----------
router.use(authenticated);
// ----------- ------------------ ------------- ---------

router.delete('/', HandleLogout);

export default router;
