import { ArgsType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CardInput } from '@/user/dto/card.input';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserArgs extends OmitType(User, ['_id', 'card', 'createdAt'] as const, ArgsType) {
  @Type(() => CardInput)
  @ValidateNested()
  card: CardInput;
}
