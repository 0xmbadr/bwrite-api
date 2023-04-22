import { ProtectedRequest } from 'app-request';
import { BlogRepo } from '../../database/repos';
import {
  AsyncHandler,
  BadRequestError,
  ForbiddenError,
  SuccessResponse,
} from '../../core';
import { Types } from 'mongoose';

const HandleGetAllEditorDrafts = AsyncHandler(
  async (req: ProtectedRequest, res) => {
    const blogs = await BlogRepo.findAllDrafts();
    return new SuccessResponse('success', blogs).send(res);
  },
);

const HandleGetAllEditorSubmitted = AsyncHandler(
  async (_: ProtectedRequest, res) => {
    const blogs = await BlogRepo.findAllSubmissions();
    return new SuccessResponse('success', blogs).send(res);
  },
);

const HandleGetAllEditorPublished = AsyncHandler(
  async (req: ProtectedRequest, res) => {
    const blogs = await BlogRepo.findAllPublished();
    return new SuccessResponse('success', blogs).send(res);
  },
);

const HandleGetSingleBlogForEditor = AsyncHandler(
  async (req: ProtectedRequest, res) => {
    const blog = await BlogRepo.findBlogAllDataById(
      new Types.ObjectId(req.params.id),
    );

    if (!blog) throw new BadRequestError('Blog does not exists');
    if (!blog.isSubmitted && !blog.isPublished)
      throw new ForbiddenError('This blog is private');

    new SuccessResponse('success', blog).send(res);
  },
);
export {
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
  HandleGetSingleBlogForEditor,
};
