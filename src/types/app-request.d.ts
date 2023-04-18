import { Request } from 'express';
import ApiKey from '../database/models/ApiKey';

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
}
