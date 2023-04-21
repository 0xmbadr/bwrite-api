import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';
import { RoleCode } from '../database/models';

export default (...roleCodes: RoleCode[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
