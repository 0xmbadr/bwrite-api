import { Types } from 'mongoose';
import { Blog } from '../../database/models';
import { caching } from '../../config';
import { addMillisToCurrentDate } from '../../core/utils';
import { getKeyForSimilar } from '../helpers/keys';
import { getListRange, setList } from '../helpers/query';

const saveSimilarBlogs = async (blogId: Types.ObjectId, blogs: Blog[]) => {
  return setList(
    getKeyForSimilar(blogId),
    blogs,
    addMillisToCurrentDate(caching.contentCacheDuration),
  );
};

const fetchSimilarBlogs = async (blogId: Types.ObjectId) => {
  return getListRange<Blog>(getKeyForSimilar(blogId));
};

export { saveSimilarBlogs, fetchSimilarBlogs };
