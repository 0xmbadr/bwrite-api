import { Router } from 'express';
import { Permission } from '../../database/models/ApiKey';
import permission from '../../middlewares/permission';
import apikey from '../../middlewares/apikey';
import signup from './auth/signup';

const router = Router();

// ----------- CHECK API KEY AND PERMISSIONS -----------
router.use(apikey);
router.use(permission(Permission.GENERAL));
// ---------- -------------- ----------- ----------- ---

router.use('/signup', signup);

export default router;
