import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Inject } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { BaseResolver } from '@/utils/graphql';
import { CreateUserArgs } from '@/user/dto/create-user.args';
import { FindUserArgs } from '@/user/dto/find-user.args';

@Resolver(() => User)
export class UserResolver extends BaseResolver(User) {
  @Inject()
  private readonly userService: UserService;

  @Query(() => [User])
  findUsers(@Args() user: FindUserArgs): Promise<User[]> {
    return this.userService.findUsers(user);
  }

  @Mutation(() => User)
  saveUser(@Args() user: CreateUserArgs): Promise<User> {
    return this.userService.saveUser(user);
  }
}
