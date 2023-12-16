import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as winston from 'winston';
import { configureSession } from './config/session.config';
import * as path from 'path';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  const uploadPath = path.join(__dirname, '..', 'uploads');
  app.useStaticAssets(uploadPath, { prefix: '/uploads' });

  // Set up Winston logger
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });
  app.useLogger(logger);

  configureSession(app);

  await app.listen(3000);
}
bootstrap();
