import { Router } from 'express';
import { HandleGetSimilarBlogs } from '../../../controllers/blog';
import { ValidationSource, validators } from '../../../middlewares';
import blogSchema from './blog.schema';

const router = Router();

router.get(
  '/similar/id/:id',
  validators(blogSchema.blogId, ValidationSource.PARAM),
  HandleGetSimilarBlogs,
);

export default router;
