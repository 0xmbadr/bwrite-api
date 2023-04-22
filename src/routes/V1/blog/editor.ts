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
  HandlePublishSingleBlog,
  HandleUnpublishSingleBlog,
  HandleDeleteSingleBlog,
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
router.put(
  '/publish/:id',
  validators(blogSchema.blogId, ValidationSource.PARAM),
  HandlePublishSingleBlog,
);
router.put(
  '/unpublish/:id',
  validators(blogSchema.blogId, ValidationSource.PARAM),
  HandleUnpublishSingleBlog,
);
router.put(
  '/:id',
  validators(blogSchema.blogId, ValidationSource.PARAM),
  HandleDeleteSingleBlog,
);

export default router;
