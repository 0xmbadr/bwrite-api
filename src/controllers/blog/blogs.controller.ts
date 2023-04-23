import { Types } from 'mongoose';
import { BlogRepo } from '../../database/repos';
import { AsyncHandler, BadRequestError, SuccessResponse } from '../../core';
import {
  fetchSimilarBlogs,
  saveSimilarBlogs,
} from '../../cache/repos/BlogsCacheRepo';

const HandleGetSimilarBlogs = AsyncHandler(async (req, res) => {
  const blogId = new Types.ObjectId(req.params.id);
  let blogs = await fetchSimilarBlogs(blogId);

  if (!blogs) {
    const blog = await BlogRepo.findInfoForPublishedById(
      new Types.ObjectId(req.params.id),
    );
    if (!blog) throw new BadRequestError('Blog is not available');
    blogs = await BlogRepo.searchSimilarBlogs(blog, 6);

    if (blogs && blogs.length > 0) await saveSimilarBlogs(blogId, blogs);
  }

  return new SuccessResponse('success', blogs ? blogs : []).send(res);
});

const HandleGetLatestBlogs = AsyncHandler(async (req, res) => {
  const blogs = await BlogRepo.findLatestBlogs(
    parseInt(req.query.pageNumber as string),
    parseInt(req.query.pageItemCount as string),
  );
  return new SuccessResponse('success', blogs).send(res);
});
export { HandleGetSimilarBlogs, HandleGetLatestBlogs };
