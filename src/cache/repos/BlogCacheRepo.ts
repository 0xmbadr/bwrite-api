import { Types } from 'mongoose';
import { Blog } from '../../database/models';
import { getKeyForId } from '../keys';
import { getJson } from '../query';

const fetchById = async (blogId: Types.ObjectId) => {
  return getJson<Blog>(getKeyForId(blogId));
};

export { fetchById };
