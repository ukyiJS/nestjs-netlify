import { ObjectType } from '@nestjs/graphql';
import { IsCreditCard, IsEnum } from 'class-validator';
import { CardType } from '../user.interface';

@ObjectType()
export class Card {
  @IsEnum(CardType, { message: '잘못된 카드 타입입니다.' })
  type: CardType;

  @IsCreditCard({ message: '잘못된 카드 번호 입니다.' })
  number: string;
}
