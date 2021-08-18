import { registerEnumType } from '@nestjs/graphql';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}

export enum CardType {
  MASTERCARD = 'mastercard',
  VISA = 'visa',
}

registerEnumType(GenderType, { name: 'GenderType' });
registerEnumType(CardType, { name: 'CardType' });
