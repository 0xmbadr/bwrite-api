import { ProtectedRequest } from 'app-request';
import { BlogRepo } from '../../database/repos';
import { AsyncHandler, SuccessResponse } from '../../core';

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

export {
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
};
