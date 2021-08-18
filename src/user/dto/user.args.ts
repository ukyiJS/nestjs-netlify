import { ArgsType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CardInput } from './card.input';

@ArgsType()
export class UserArgs extends OmitType(User, ['_id', 'card'], ArgsType) {
  card: CardInput;
}
