import crypto from 'crypto';

import bcrypt from 'bcrypt';
import _ from 'lodash';

import {
  AsyncHandler,
  BadRequestError,
  SuccessResponse,
  createTokens,
} from '../../core';
import { UserRepo } from '../../database/repos';
import { RoleCode, User } from '../../database/models';
import { RoleRequest } from 'app-request';

const HandleSignUp = AsyncHandler(async (req: RoleRequest, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user is already registered
  const user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError('User already registered');

  // 2. generate accessTokenKey, refershTokenKey, and hash password
  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');
  const passwordHashed = await bcrypt.hash(password, 10);

  // 3. create user
  const { user: createdUser, keystore } = await UserRepo.create(
    {
      name,
      email,
      password: passwordHashed,
    } as User,
    accessTokenKey,
    refreshTokenKey,
    RoleCode.LEARNER,
  );

  // 4. create tokens
  const tokens = await createTokens(
    createdUser,
    keystore.primaryKey,
    keystore.secondaryKey,
  );
  // 5. send response
  new SuccessResponse('Signup Successful', {
    user: _.pick(createdUser, ['_id', 'name', 'roles', 'profilePicUrl']),
    tokens: tokens,
  }).send(res);
});

export default HandleSignUp;
