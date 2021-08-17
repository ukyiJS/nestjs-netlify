import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getEnv } from './utils';
import { AppModule } from '@/app.module';
import { ValidationOptions } from '@/config';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = getEnv('PORT');
  await app.useGlobalPipes(new ValidationPipe(ValidationOptions)).listen(port);

  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Server');
})();
