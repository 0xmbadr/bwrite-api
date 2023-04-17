import Keystore, { KeystoreModel } from '../models/Keystore';
import { Types } from 'mongoose';
import User from '../models/User';

const findforKey = (client: User, key: string): Promise<Keystore | null> => {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: key,
    status: true,
  })
    .lean()
    .exec();
};

const remove = (id: Types.ObjectId): Promise<Keystore | null> => {
  return KeystoreModel.findByIdAndRemove(id).lean().exec();
};

const removeAllForClient = (client: User) => {
  return KeystoreModel.deleteMany({ client: client }).exec();
};

const find = async (
  client: User,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore | null> => {
  return KeystoreModel.findOne({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
  })
    .lean()
    .exec();
};

const create = async (
  client: User,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore> => {
  const now = new Date();
  const keystore = await KeystoreModel.create({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
    createdAt: now,
    updatedAt: now,
  });
  return keystore.toObject();
};

export default {
  findforKey,
  remove,
  removeAllForClient,
  find,
  create,
};
