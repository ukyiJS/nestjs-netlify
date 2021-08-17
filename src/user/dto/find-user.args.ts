import { ArgsType, PartialType } from '@nestjs/graphql';
import { UserArgs } from '@/user/dto/user.args';

@ArgsType()
export class FindUserArgs extends PartialType(UserArgs) {
}
