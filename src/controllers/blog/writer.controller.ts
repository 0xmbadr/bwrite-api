import { ProtectedRequest } from 'app-request';
import { BlogRepo } from '../../database/repos';
import {
  AsyncHandler,
  BadRequestError,
  SuccessResponse,
  ForbiddenError,
  SuccessMsgResponse,
} from '../../core';
import { Blog } from '../../database/models';
import { Types } from 'mongoose';

/**
 * format any endpoint so that:
 *  1. whitespaces are replaced by an empty string
 *  2. \ charac is replaced by - charac
 *  3. ? is repalced by empty string
 *
 * @example - `blog/intro-to-react` will be `blog-intro-to-react`
 */

const formatEndpoint = (endpoint: string) =>
  endpoint.replace(/\s/g, '').replace(/\//g, '-').replace(/\?/g, '');

const HandleCreateBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  req.body.blogUrl = formatEndpoint(req.body.blogUrl);

  const blog = await BlogRepo.findUrlIfExists(req.body.blogUrl);
  if (blog) throw new BadRequestError('Blog with this url already exists');

  const createdBlog = await BlogRepo.create({
    title: req.body.title,
    description: req.body.description,
    draftText: req.body.text,
    tags: req.body.tags,
    author: req.user,
    blogUrl: req.body.blogUrl,
    imgUrl: req.body.imgUrl,
    score: req.body.score,
    createdBy: req.user,
    updatedBy: req.user,
  } as Blog);

  new SuccessResponse('Blog created successfully', createdBlog).send(res);
});

const HandleUpdateBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blog = await BlogRepo.findBlogAllDataById(
    new Types.ObjectId(req.params.id),
  );
  if (blog == null) throw new BadRequestError('Blog does not exists');
  if (!blog.author._id.equals(req.user._id))
    throw new ForbiddenError("You don't have necessary permissions");

  if (req.body.blogUrl && blog.blogUrl !== req.body.blogUrl) {
    const endpoint = formatEndpoint(req.body.blogUrl);
    const existingBlog = await BlogRepo.findUrlIfExists(endpoint);
    if (existingBlog) throw new BadRequestError('Blog URL already used');
    blog.blogUrl = endpoint;
  }

  if (req.body.title) blog.title = req.body.title;
  if (req.body.description) blog.description = req.body.description;
  if (req.body.text) blog.draftText = req.body.text;
  if (req.body.tags) blog.tags = req.body.tags;
  if (req.body.imgUrl) blog.imgUrl = req.body.imgUrl;
  if (req.body.score) blog.score = req.body.score;

  await BlogRepo.update(blog);
  new SuccessResponse('Blog updated successfully', blog).send(res);
});

const HandleSubmitBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blog = await BlogRepo.findBlogAllDataById(
    new Types.ObjectId(req.params.id),
  );
  if (!blog) throw new BadRequestError('Blog does not exists');
  if (!blog.author._id.equals(req.user._id))
    throw new ForbiddenError("You don't have necessary permissions");

  blog.isSubmitted = true;
  blog.isDraft = false;

  await BlogRepo.update(blog);
  return new SuccessMsgResponse('Blog submitted successfully').send(res);
});

const HandleWithdrawBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blog = await BlogRepo.findBlogAllDataById(
    new Types.ObjectId(req.params.id),
  );
  if (!blog) throw new BadRequestError('Blog does not exists');
  if (!blog.author._id.equals(req.user._id))
    throw new ForbiddenError("You don't have necessary permissions");

  blog.isSubmitted = false;
  blog.isDraft = true;

  await BlogRepo.update(blog);
  return new SuccessMsgResponse('Blog withdrawn successfully').send(res);
});

const HandleGetBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blog = await BlogRepo.findBlogAllDataById(
    new Types.ObjectId(req.params.id),
  );
  if (!blog) throw new BadRequestError('Blog does not exists');
  if (!blog.author._id.equals(req.user._id))
    throw new ForbiddenError("You don't have necessary permissions");
  new SuccessResponse('success', blog).send(res);
});

const HandleDeleteBlog = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blog = await BlogRepo.findBlogAllDataById(
    new Types.ObjectId(req.params.id),
  );
  if (!blog) throw new BadRequestError('Blog does not exists');
  if (!blog.author._id.equals(req.user._id))
    throw new ForbiddenError("You don't have necessary permissions");

  if (blog.isPublished) {
    blog.isDraft = false;
    // revert to the original state
    blog.draftText = blog.text;
  } else {
    blog.status = false;
  }

  await BlogRepo.update(blog);
  return new SuccessMsgResponse('Blog deleted successfully').send(res);
});

const HandleGetAllDrafts = AsyncHandler(async (req: ProtectedRequest, res) => {
  const blogs = await BlogRepo.findAllDraftsForWriter(req.user);
  return new SuccessResponse('success', blogs).send(res);
});

const HandleGetAllSubmitted = AsyncHandler(
  async (req: ProtectedRequest, res) => {
    const blogs = await BlogRepo.findAllSubmissionsForWriter(req.user);
    return new SuccessResponse('success', blogs).send(res);
  },
);

export {
  HandleCreateBlog,
  HandleUpdateBlog,
  HandleSubmitBlog,
  HandleWithdrawBlog,
  HandleGetBlog,
  HandleDeleteBlog,
  HandleGetAllDrafts,
  HandleGetAllSubmitted,
};
