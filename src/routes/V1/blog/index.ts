import { Router } from 'express';
import addRoleCodesToRequest from '../../../middlewares/addRoleCodesToRequest';
import { authenticated, authorized, validators } from '../../../middlewares';
import { RoleCode } from '../../../database/models';
import schema from './blog.schema';
import { HandleCreateBlog } from '../../../controllers/blog';

const router = Router();

// ========= User Must be authenticated, and authorized with RoleCode Writer =======
router.use(authenticated, addRoleCodesToRequest(RoleCode.WRITER), authorized);
// ============== =============== ================ =========== ============ ========

router.post('/', validators(schema.createBlog), HandleCreateBlog);

export default router;
