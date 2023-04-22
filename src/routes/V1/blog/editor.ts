import { Router } from 'express';
import { RoleCode } from '../../../database/models';
import {
  authenticated,
  addRoleCodesToRequest,
  authorized,
} from '../../../middlewares';

import {
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
} from '../../../controllers/blog';

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

export default router;
