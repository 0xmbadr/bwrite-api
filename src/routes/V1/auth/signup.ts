import { Router } from 'express';
import validateSignUpSchema from '../../../middlewares/validators';
import { HandleSignUp } from './../../../controllers/auth';
import schema from './auth.schema';

const router = Router();

router.post('/basic', validateSignUpSchema(schema.signup), HandleSignUp);

export default router;
