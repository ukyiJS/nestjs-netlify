import { BadRequestException, HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ObjectLiteral } from '@/types';

export const ValidationOptions: ValidationPipeOptions = {
  transform: true,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  skipMissingProperties: true,
  exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
    const getValidation = ({ property, constraints = {} }:ValidationError): ObjectLiteral => ({ [property]: Object.values(constraints)[0] });
    const errors = validationErrors.reduce<ObjectLiteral>((acc, error) => {
      const { children = [] } = error;
      return acc.concat(children.length ? children.map(getValidation) : getValidation(error));
    }, []);
    return new BadRequestException(errors, 'VALIDATION_ERROR');
  },
};
