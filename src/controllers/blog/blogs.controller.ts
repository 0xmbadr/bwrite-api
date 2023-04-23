import { Types } from 'mongoose';
import { BlogRepo } from '../../database/repos';
import { AsyncHandler, BadRequestError, SuccessResponse } from '../../core';

const HandleGetSimilarBlogs = AsyncHandler(async (req, res) => {
  const blog = await BlogRepo.findInfoForPublishedById(
    new Types.ObjectId(req.params.id),
  );
  if (!blog) throw new BadRequestError('Blog is not available');

  const blogs = await BlogRepo.searchSimilarBlogs(blog, 6);

  return new SuccessResponse('success', blogs ? blogs : []).send(res);
});

export { HandleGetSimilarBlogs };
