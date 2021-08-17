import { IsNotEmpty } from 'class-validator';

export enum Env {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvVariables {
  NODE_ENV: Env = Env.PRODUCTION;
  PORT = '3000';
  @IsNotEmpty({ message: 'database url이 존재하지 않습니다.' })
  DATABASE_URL: string;
  NETLIFY_BUILD?: string;
}
