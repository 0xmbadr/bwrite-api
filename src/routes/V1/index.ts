import { Router } from 'express';
import { Permission } from '../../database/models/ApiKey';
import permission from '../../middlewares/permission';
import apikey from '../../middlewares/apikey';
import { signup, login, logout } from './auth';

const router = Router();

// ----------- CHECK API KEY AND PERMISSIONS -----------
router.use(apikey);
router.use(permission(Permission.GENERAL));
// ---------- -------------- ----------- ----------- ---

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);

export default router;
