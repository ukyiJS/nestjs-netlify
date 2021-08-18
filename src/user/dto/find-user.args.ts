import { ArgsType, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CardInput } from '@/user/dto/card.input';
import { UserArgs } from './user.args';

@InputType()
class FindCardInput extends PartialType(CardInput) {}

@ArgsType()
export class FindUserArgs extends OmitType(PartialType(UserArgs), ['card'] as const) {
  @Type(() => FindCardInput)
  @ValidateNested()
  card?: FindCardInput;
}
