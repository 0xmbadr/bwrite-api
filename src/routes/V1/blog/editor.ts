import { Router } from 'express';
import { RoleCode } from '../../../database/models';
import {
  authenticated,
  addRoleCodesToRequest,
  authorized,
  validators,
  ValidationSource,
} from '../../../middlewares';

import {
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
  HandleGetSingleBlogForEditor,
} from '../../../controllers/blog';
import blogSchema from './blog.schema';

const router = Router();

// ========= User Must be authenticated, and authorized with RoleCode ADMIN OR EDITOR =======
router.use(
  authenticated,
  addRoleCodesToRequest(RoleCode.ADMIN, RoleCode.EDITOR),
  authorized,
);
// ======================= ====================== ==================== ======================

router.get('/drafts', HandleGetAllEditorDrafts);
router.get('/submitted', HandleGetAllEditorSubmitted);
router.get('/published', HandleGetAllEditorPublished);
router.get(
  '/:id',
  validators(blogSchema.blogId, ValidationSource.PARAM),
  HandleGetSingleBlogForEditor,
);

export default router;
