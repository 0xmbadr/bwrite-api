import Joi from 'joi';

export default {
  signup: Joi.object().keys({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
    profilePicUrl: Joi.string().optional().uri(),
  }),
  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};
