import { Router } from 'express';
import validateLoginSchema from '../../../middlewares/validators';
import { HandleLogin } from './../../../controllers/auth';
import schema from './auth.schema';

const router = Router();

router.post('/basic', validateLoginSchema(schema.login), HandleLogin);

export default router;
