import { NextFunction, Response, Router } from 'express';
import validators, { ValidationSource } from './validators';
import schema from './header.schema';
import {
  AccessTokenError,
  AsyncHandler,
  AuthFailureError,
  getAccessToken,
  JWT,
  TokenExpiredError,
  validateTokenData,
} from '../core';
import { ProtectedRequest } from 'app-request';
import { UserRepo, KeystoreRepo } from '../database/repos';
import { Types } from 'mongoose';

const router = Router();

export default router.use(
  validators(schema.auth, ValidationSource.HEADER),
  AsyncHandler(
    async (req: ProtectedRequest, _: Response, next: NextFunction) => {
      // extract access token from header
      req.accessToken = getAccessToken(req.headers.authorization);
      try {
        const payload = await JWT.validate(req.accessToken);
        validateTokenData(payload);

        const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
        if (!user) throw new AuthFailureError('User not registered');
        req.user = user;

        const keystore = await KeystoreRepo.findforKey(req.user, payload.prm);
        if (!keystore) throw new AuthFailureError('Invalid access token');
        req.keystore = keystore;

        return next();
      } catch (err) {
        if (err instanceof TokenExpiredError)
          throw new AccessTokenError(err.message);
        throw err;
      }
    },
  ),
);
