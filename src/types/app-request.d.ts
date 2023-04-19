import { Request } from 'express';
import { ApiKey, Keystore, User } from '../database/models';

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
declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}
