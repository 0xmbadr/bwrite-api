import { Request } from 'express';
import { ApiKey } from '../database/models';

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
}
declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}
declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
