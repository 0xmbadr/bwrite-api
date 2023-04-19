import { ProtectedRequest } from 'app-request';
import { AsyncHandler } from '../../core';

const HandleRefreshToken = AsyncHandler(async (req: ProtectedRequest, res) => {
  //   refersh Token Logic
});

export default HandleRefreshToken;
