import { Router } from 'express';
import validators, { ValidationSource } from '../../../middlewares/validators';
import { HandleRefreshToken } from './../../../controllers/auth';
import schema from './auth.schema';

const router = Router();

router.post(
  '/',
  validators(schema.auth, ValidationSource.HEADER),
  validators(schema.refreshToken),
  HandleRefreshToken,
);

export default router;
