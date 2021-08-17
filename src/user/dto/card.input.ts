import { InputType } from '@nestjs/graphql';
import { IsCreditCard, IsEnum } from 'class-validator';
import { CardType } from '@/types/user';

@InputType()
export class CardInput {
  @IsEnum(CardType, { message: '잘못된 카드 타입입니다.' })
  type?: CardType;
  @IsCreditCard({ message: '잘못된 카드 번호 입니다.' })
  number?: string;
}
