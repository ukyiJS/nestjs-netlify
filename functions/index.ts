import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { Express } from 'express-serve-static-core';
import { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { AppModule } from '@/app.module';
import 'apollo-server-express';
import 'mongodb';

const server = express();
let cacheNest = false;

const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance), { cors: true });
  await app.init();
};

const appServer = serverless(server);

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
  if (!cacheNest) {
    await createNestServer(server)
      .then(() => Logger.log('🚀 Server running', 'Server'))
      .catch((err) => Logger.error(err, 'Server Error'));
    cacheNest = true;
  }

  return appServer(event, context);
};
