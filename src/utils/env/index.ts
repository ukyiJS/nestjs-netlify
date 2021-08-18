import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '@/types';

const configService = new ConfigService<EnvVariables>();
export const getEnv = <K extends keyof EnvVariables>(key: K): EnvVariables[K] => <EnvVariables[K]>configService.get(key);
