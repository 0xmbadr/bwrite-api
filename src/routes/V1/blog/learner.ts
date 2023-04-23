import { Router } from 'express';
import { GetBlogByURL } from '../../../controllers/blog';
import { ValidationSource, validators } from '../../../middlewares';

import schema from './blog.schema';

const router = Router();

router.get(
  '/url',
  validators(schema.blogUrl, ValidationSource.QUERY),
  GetBlogByURL,
);

export default router;
