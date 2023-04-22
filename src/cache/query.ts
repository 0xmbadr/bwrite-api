import cache from '.';
import { DynamicKeyType, Key } from './keys';

export enum TYPES {
  STRING = 'string',
}

export const getValue = (key: Key | DynamicKeyType) => {
  return cache.get(key);
};

export const setValue = async (
  key: Key | DynamicKeyType,
  value: string | number,
  expireAt: Date | null = null,
) => {
  if (expireAt) return cache.pSetEx(key, expireAt.getTime(), `${value}`);
  else return cache.set(key, `${value}`);
};

export const getJson = async <T>(key: Key | DynamicKeyType) => {
  const type = await cache.type(key);
  if (type !== TYPES.STRING) return null;

  const json = await getValue(key);
  if (json) return JSON.parse(json) as T;

  return null;
};

export const setJson = async (
  key: Key | DynamicKeyType,
  value: Record<string, unknown>,
  expireAt: Date | null = null,
) => {
  const json = JSON.stringify(value);
  return await setValue(key, json, expireAt);
};
