import {
  HandleCreateBlog,
  HandleUpdateBlog,
  HandleSubmitBlog,
  HandleWithdrawBlog,
  HandleGetBlog,
  HandleDeleteBlog,
  HandleGetAllDrafts,
  HandleGetAllSubmitted,
  HandleGetAllPublished,
} from './writer.controller';
import {
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
  HandleGetSingleBlogForEditor,
  HandlePublishSingleBlog,
  HandleUnpublishSingleBlog,
  HandleDeleteSingleBlog,
} from './editor.controller';
import { AsyncHandler, SuccessResponse, NotFoundError } from '../../core';
import { fetchByUrl, save } from './../../cache/repos/BlogCacheRepo';
import { BlogRepo } from '../../database/repos';

const GetBlogByURL = AsyncHandler(async (req, res) => {
  const blogUrl = req.query.endpoint as string;
  let blog = await fetchByUrl(blogUrl);

  if (!blog) {
    blog = await BlogRepo.findPublishedByUrl(blogUrl);
    if (blog) await save(blog);
  }

  if (!blog) throw new NotFoundError('Blog not found');
  return new SuccessResponse('success', blog).send(res);
});

export {
  HandleCreateBlog,
  HandleUpdateBlog,
  HandleSubmitBlog,
  HandleWithdrawBlog,
  HandleGetBlog,
  HandleDeleteBlog,
  HandleGetAllDrafts,
  HandleGetAllSubmitted,
  HandleGetAllPublished,
  HandleGetAllEditorDrafts,
  HandleGetAllEditorSubmitted,
  HandleGetAllEditorPublished,
  HandleGetSingleBlogForEditor,
  HandlePublishSingleBlog,
  HandleUnpublishSingleBlog,
  HandleDeleteSingleBlog,
  GetBlogByURL,
};
