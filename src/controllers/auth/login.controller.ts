import crypto from 'crypto';

import bcrypt from 'bcrypt';
import _ from 'lodash';

import {
  AsyncHandler,
  AuthFailureError,
  BadRequestError,
  SuccessResponse,
  createTokens,
} from '../../core';
import { KeystoreRepo, UserRepo } from '../../database/repos';
import { PublicRequest } from 'app-request';

const HandleLogin = AsyncHandler(async (req: PublicRequest, res) => {
  const { email, password }: { email: string; password: string } = req.body;
  // 1. try to find user by email, if not found throw error
  const user = await UserRepo.findByEmail(email);
  if (!user) throw new BadRequestError('User not registered');

  // 2. check if req's password is the same as saved password.
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AuthFailureError('Incorrect Password!');

  // 3. generate token keys and save it in KeystoreRepo
  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');

  await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);

  // 4. create access tokens and send it to the enduser.
  const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

  new SuccessResponse('Login Success', {
    user: _.pick(user, ['_id', 'name', 'roles', 'profilePicUrl']),
    tokens: tokens,
  }).send(res);
});

export default HandleLogin;
