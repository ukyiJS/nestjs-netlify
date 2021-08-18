import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '@/utils';
import { FindUserArgs } from './dto/find-user.args';
import { UserArgs } from './dto/user.args';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver extends BaseResolver(User) {
  @Inject()
  private readonly userService: UserService;

  @Query(() => [User])
  findUsers(@Args() user: FindUserArgs): Promise<User[]> {
    return this.userService.findUsers(user);
  }

  @Mutation(() => User)
  saveUser(@Args() user: UserArgs): Promise<User> {
    return this.userService.saveUser(user);
  }
}
