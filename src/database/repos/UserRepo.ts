import { Types } from 'mongoose';
import { InternalError } from '../../core/ApiError';
import Keystore from '../models/Keystore';
import { RoleModel } from '../models/Role';
import User, { UserModel } from '../models/User';
import KeystoreRepo from './KeystoreRepo';

/**
 * @description checks if user with `id` exists.
 */
const exists = async (id: Types.ObjectId): Promise<boolean> => {
  const user = await UserModel.exists({ _id: id, status: true });
  return user !== null;
};

/**
 * @description returns user's public data.
 */
const findPublicProfileById = async (
  id: Types.ObjectId,
): Promise<User | null> => {
  return UserModel.findOne({ _id: id, status: true }).lean().exec();
};

/**
 * @description returns user's private data.
 */
const findPrivateProfileById = async (
  id: Types.ObjectId,
): Promise<User | null> => {
  return UserModel.findOne({ _id: id, status: true })
    .select('+email')
    .populate({
      path: 'roles',
      match: { status: true },
      select: { code: 1 },
    })
    .lean<User>()
    .exec();
};

/**
 *
 * @description: create user and saves his token into db.
 */
const create = async (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string,
  roleCode: string,
): Promise<{ user: User; keystore: Keystore }> => {
  const now = new Date();

  const role = await RoleModel.findOne({ code: roleCode })
    .select('+code')
    .lean()
    .exec();
  if (!role) throw new InternalError('Role must be defined');

  user.roles = [role];
  user.createdAt = user.updatedAt = now;
  const createdUser = await UserModel.create(user);
  const keystore = await KeystoreRepo.create(
    createdUser,
    accessTokenKey,
    refreshTokenKey,
  );
  return {
    user: { ...createdUser.toObject(), roles: user.roles },
    keystore: keystore,
  };
};

/**
 *
 * @description: update user and saves new tokens into db.
 */
const update = async (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<{ user: User; keystore: Keystore }> => {
  user.updatedAt = new Date();
  await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
  const keystore = await KeystoreRepo.create(
    user,
    accessTokenKey,
    refreshTokenKey,
  );
  return { user: user, keystore: keystore };
};

async function updateUserInfo(user: User): Promise<any> {
  user.updatedAt = new Date();
  return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
}

export default {
  exists,
  findPublicProfileById,
  findPrivateProfileById,
  create,
  update,
  updateUserInfo,
};
