import { Router } from 'express';
import { Permission } from '../../database/models/ApiKey';
import permission from '../../middlewares/permission';
import apikey from '../../middlewares/apikey';

const router = Router();

// ----------- CHECK API KEY AND PERMISSIONS -----------
router.use(apikey);
router.use(permission(Permission.GENERAL));
// ---------- -------------- ----------- ----------- ---

router.get('/', (req, res) => {
  res.send('Hello world!');
});

export default router;
