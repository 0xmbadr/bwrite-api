import cache from '..';
import { DynamicKeyType, Key } from './keys';

export enum TYPES {
  STRING = 'string',
  LIST = 'list',
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

export const getListRange = async <T>(
  key: Key | DynamicKeyType,
  start = 0,
  end = -1,
) => {
  const type = await cache.type(key);
  if (type !== TYPES.LIST) return null;

  const list = await cache.lRange(key, start, end);
  if (!list) return null;

  const data = list.map((entry) => JSON.parse(entry) as T);
  return data;
};
