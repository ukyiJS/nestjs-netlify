import { classToPlain } from 'class-transformer';
import { ObjectLiteral } from '@/types';

export const query = <T extends ObjectLiteral>(args: T): T => {
  const isObject = (obj: ObjectLiteral): boolean => Object === obj.constructor;
  const stringToRegExp = (str: string): RegExp => RegExp(`^${str}`, 'gi');
  const flatObject = (parentKey: string, obj: ObjectLiteral): ObjectLiteral => Object.entries(obj).reduce((acc, [key, value]) => {
    const joinKey = [parentKey, key].join('.');
    return { ...acc, ...(isObject(value) ? flatObject(joinKey, value) : { [joinKey]: stringToRegExp(value) }) };
  }, {});

  return Object.entries(classToPlain(args)).reduce((acc, [key, value]) => {
    switch (true) {
      case !value:
        return acc;
      case isObject(value):
        return { ...acc, ...flatObject(key, value) };
      case Array.isArray(value):
        return { ...acc, [key]: { $all: value } };
      default:
        return { ...acc, [key]: stringToRegExp(value) };
    }
  }, <T>{});
};
