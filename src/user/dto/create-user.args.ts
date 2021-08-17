import { ArgsType } from '@nestjs/graphql';
import { UserArgs } from '@/user/dto/user.args';

@ArgsType()
export class CreateUserArgs extends UserArgs {
}
