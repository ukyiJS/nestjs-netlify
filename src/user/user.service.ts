import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { query } from '@/utils/database';
import { CreateUserArgs } from '@/user/dto/create-user.args';
import { FindUserArgs } from '@/user/dto/find-user.args';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: MongoRepository<User>;

  findUsers(user: FindUserArgs): Promise<User[]> {
    return this.userRepository.find({ where: query(user) });
  }

  saveUser(user: CreateUserArgs): Promise<User> {
    return this.userRepository.save(new User(user as User));
  }
}
