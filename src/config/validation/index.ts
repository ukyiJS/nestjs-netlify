import { BadRequestException, HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const ValidationOptions: ValidationPipeOptions = {
  transform: true,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  skipMissingProperties: true,
  exceptionFactory(validationErrors: ValidationError[] = []): BadRequestException {
    const errors = validationErrors.map(e => ({ [e.property]: Object.values(e.constraints ?? {})[0] }));
    return new BadRequestException(errors, 'VALIDATION_ERROR');
  },
};
