import app from './app';
import { port } from './config';
import Logger from './core/Logger';

app
  .listen(port, () => {
    Logger.info(`server is running at port: ${port} `);
  })
  .on('error', (e) => Logger.error(e));
