import {
  ServerLoader,
  GlobalAcceptMimesMiddleware,
  ServerSettings
} from '@tsed/common';
import * as Path from 'path';
import { Env } from '@tsed/core';

@ServerSettings({
  rootDir: Path.resolve(__dirname), // optional. By default it's equal to process.cwd()
  mount: {
    '/api': '${rootDir}/api/**/*.controller.ts'
  },
  // env: Env.DEV,
  port: 1111,
  debug: false,
  httpsPort: 3000,
  componentsScan: [
    '${rootDir}/**/*.middleware.ts',
    '${rootDir}/**/*.service.ts',
    '${rootDir}/**/*.converter.ts'
  ],
  routers: {
    caseSensitive: false
  }
})
export class Server extends ServerLoader {

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $onMountingMiddlewares(): void | Promise<any> {
    const morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      methodOverride = require('method-override');

    this.use(morgan('dev'))
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );

    return null;
  }

  public $onReady() {
    console.log('Server started...');
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}
