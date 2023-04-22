import { Types } from 'mongoose';
import { Blog } from '../../database/models';
import { getKeyForId, getKeyForUrl } from '../keys';
import { getJson } from '../query';

const fetchById = async (blogId: Types.ObjectId) => {
  return getJson<Blog>(getKeyForId(blogId));
};

const fetchByUrl = async (blogUrl: string) => {
  return getJson<Blog>(getKeyForUrl(blogUrl));
};

export { fetchById, fetchByUrl };
