import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse, AsyncHandler } from '../../core';
import { KeystoreRepo } from '../../database/repos';

const HandleLogout = AsyncHandler(async (req: ProtectedRequest, res) => {
  await KeystoreRepo.remove(req.keystore._id);
  new SuccessMsgResponse('Logout success').send(res);
});

export default HandleLogout;
