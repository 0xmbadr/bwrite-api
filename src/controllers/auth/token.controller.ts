import crypto from 'crypto';
import { ProtectedRequest } from 'app-request';
import { KeystoreRepo, UserRepo } from '../../database/repos';
import {
  AsyncHandler,
  AuthFailureError,
  createTokens,
  getAccessToken,
  JWT,
  validateTokenData,
  TokenRefreshResponse,
} from '../../core';
import { Types } from 'mongoose';

const HandleRefreshToken = AsyncHandler(async (req: ProtectedRequest, res) => {
  req.accessToken = getAccessToken(req.headers.authorization);

  const accessTokenPayload = await JWT.decode(req.accessToken);
  validateTokenData(accessTokenPayload);

  const user = await UserRepo.findById(
    new Types.ObjectId(accessTokenPayload.sub),
  );
  if (!user) throw new AuthFailureError('User not registered');
  req.user = user;

  const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
  validateTokenData(refreshTokenPayload);

  if (accessTokenPayload.sub !== refreshTokenPayload.sub)
    throw new AuthFailureError('Invalid access token');

  const keystore = await KeystoreRepo.find(
    req.user,
    accessTokenPayload.prm,
    refreshTokenPayload.prm,
  );

  if (!keystore) throw new AuthFailureError('Invalid access token');
  await KeystoreRepo.remove(keystore._id);

  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');

  await KeystoreRepo.create(req.user, accessTokenKey, refreshTokenKey);
  const tokens = await createTokens(req.user, accessTokenKey, refreshTokenKey);

  new TokenRefreshResponse(
    'Token Issued',
    tokens.accessToken,
    tokens.refreshToken,
  ).send(res);
});

export default HandleRefreshToken;
