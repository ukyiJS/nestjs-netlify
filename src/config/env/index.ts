import { Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvVariables } from '@/types';

export const validate = (config: Record<string, unknown>): EnvVariables => {
  const validatedConfig = plainToClass(EnvVariables, { ...config }, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig).map(err => Object.values(err.constraints ?? {})[0]);
  if (!errors.length) return validatedConfig;

  Logger.error(errors.join(' '), 'NotFound');
  throw new NotFoundException('Environment Not Found');
};
