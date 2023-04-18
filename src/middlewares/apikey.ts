import express, { NextFunction, Response } from 'express';
import ApiKeyRepo from '../database/repos/ApiKeyRepo';
import { ForbiddenError } from '../core/ApiError';
import Logger from '../core/Logger';
import schema from './header.schema';
import validator, { ValidationSource, Header } from './validators';
import asyncHandler from '../core/AsyncHandler';
import { PublicRequest } from 'app-request';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, _: Response, next: NextFunction) => {
    /**
     * Throw Forbidden ERROR if
     *  1) No Key Found in the Req Header
     *  2) The key is not found in DB.
     */

    const key = req.headers[Header.API_KEY]?.toString();
    if (!key) throw new ForbiddenError();

    const apiKey = await ApiKeyRepo.findByKey(key);
    if (!apiKey) throw new ForbiddenError();

    // Log apikey
    // Logger.info(apiKey);

    // add apiKey to the req body.
    req.apiKey = apiKey;

    return next();
  }),
);
