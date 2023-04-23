import { Router } from 'express';
import {
  HandleGetSimilarBlogs,
  HandleGetLatestBlogs,
} from '../../../controllers/blog';
import { ValidationSource, validators } from '../../../middlewares';
import schema from './blog.schema';

const router = Router();

router.get(
  '/latest',
  validators(schema.pagination, ValidationSource.QUERY),
  HandleGetLatestBlogs,
);

router.get(
  '/similar/id/:id',
  validators(schema.blogId, ValidationSource.PARAM),
  HandleGetSimilarBlogs,
);

export default router;
