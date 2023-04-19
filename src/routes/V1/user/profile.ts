import { Router } from 'express';
import authenticated from '../../../middlewares/authenticated';
import {
  HandleGetProfile,
  HandleUpdateProfile,
} from '../../../controllers/user/profile.controller';
import validators from '../../../middlewares/validators';
import schema from './schema';

const router = Router();

// ========== USER MUST BE AUTHENTICATED ============
router.use(authenticated);
// ---------- -------------- ----------- ------------

router.get('/', HandleGetProfile);
router.put('/', validators(schema.profile), HandleUpdateProfile);

export default router;
