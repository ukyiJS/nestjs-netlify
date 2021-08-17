import { InputType } from '@nestjs/graphql';
import { IsEnum, IsNumberString } from 'class-validator';
import { CardType } from '@/types/user';

@InputType()
export class CardInput {
  @IsEnum(CardType, { message: '잘못된 카드 타입입니다.' })
  type?: CardType;
  @IsNumberString(undefined, { message: '잘못된 카드 번호 입니다.' })
  number?: string;
}
