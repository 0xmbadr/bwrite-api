import { Router } from 'express';
import addRoleCodesToRequest from '../../../middlewares/addRoleCodesToRequest';
import {
  authenticated,
  authorized,
  validators,
  ValidationSource,
} from '../../../middlewares';
import { RoleCode } from '../../../database/models';
import schema from './blog.schema';
import {
  HandleCreateBlog,
  HandleUpdateBlog,
  HandleSubmitBlog,
  HandleWithdrawBlog,
  HandleGetBlog,
  HandleDeleteBlog,
  HandleGetAllDrafts,
} from '../../../controllers/blog';

const router = Router();

// ========= User Must be authenticated, and authorized with RoleCode Writer =======
router.use(authenticated, addRoleCodesToRequest(RoleCode.WRITER), authorized);
// ============== =============== ================ =========== ============ ========

router.get('/drafts', HandleGetAllDrafts);

router.get(
  '/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  HandleGetBlog,
);
router.post('/', validators(schema.createBlog), HandleCreateBlog);
router.put(
  '/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  validators(schema.updateBlog),
  HandleUpdateBlog,
);
router.delete(
  '/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  HandleDeleteBlog,
);
router.put(
  '/submit/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  HandleSubmitBlog,
);
router.put(
  '/withdraw/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  HandleWithdrawBlog,
);

export default router;
