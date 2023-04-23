import { Router } from 'express';
import { GetBlogByURL, GetBlogById } from '../../../controllers/blog';
import { ValidationSource, validators } from '../../../middlewares';

import schema from './blog.schema';

const router = Router();

router.get(
  '/url',
  validators(schema.blogUrl, ValidationSource.QUERY),
  GetBlogByURL,
);

router.get(
  '/id/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  GetBlogById,
);

export default router;
