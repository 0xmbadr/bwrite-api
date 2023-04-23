import { Types } from 'mongoose';
import { addMillisToCurrentDate } from '../../core/utils';
import { caching } from '../../config';
import { Blog } from '../../database/models';
import { getKeyForId, getKeyForUrl } from '../helpers/keys';
import { getJson, setJson } from '../helpers/query';

const fetchById = async (blogId: Types.ObjectId) => {
  return getJson<Blog>(getKeyForId(blogId));
};

const fetchByUrl = async (blogUrl: string) => {
  return getJson<Blog>(getKeyForUrl(blogUrl));
};

const save = async (blog: Blog) => {
  return setJson(
    getKeyForId(blog._id),
    { ...blog },
    addMillisToCurrentDate(caching.contentCacheDuration),
  );
};

export { fetchById, fetchByUrl, save };
