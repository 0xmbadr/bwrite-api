import { Router } from 'express';
import addRoleCodesToRequest from '../../../middlewares/addRoleCodesToRequest';
import { AsyncHandler } from '../../../core';
import { authenticated, authorized } from '../../../middlewares';
import { RoleCode } from '../../../database/models';

const router = Router();

// ========= User Must be authenticated, and authorized with RoleCode Writer =======
router.use(authenticated, addRoleCodesToRequest(RoleCode.WRITER), authorized);
// ============== =============== ================ =========== ============ ========

router.post(
  '/',
  AsyncHandler(async (req, res) => {
    //
  }),
);

export default router;
