import { Router } from 'express';
import validateSignUpSchema from '../../../middlewares/validators';
import HandleSignUp from './../../../controllers/auth/signup.controller';
import schema from './schema';

const router = Router();

router.post('/basic', validateSignUpSchema(schema.signup), HandleSignUp);

export default router;
