import { Types } from 'mongoose';

export enum Key {
  BLOGS_LATEST = 'BLOGS_LATEST',
}

export enum DynamicKey {
  BLOGS_SIMILAR = 'BLOGS_SIMILAR',
  BLOG = 'BLOG',
}

export type DynamicKeyType = `${DynamicKey}_${string}`;

export function getDynamicKey(key: DynamicKey, suffix: string) {
  const dynamic: DynamicKeyType = `${key}_${suffix}`;
  return dynamic;
}

export const getKeyForId = (blogId: Types.ObjectId) => {
  return getDynamicKey(DynamicKey.BLOG, blogId.toHexString());
};

export const getKeyForUrl = (blogUrl: string) => {
  return getDynamicKey(DynamicKey.BLOG, blogUrl);
};

export const getKeyForSimilar = (blogId: Types.ObjectId) => {
  return getDynamicKey(DynamicKey.BLOGS_SIMILAR, blogId.toHexString());
};
