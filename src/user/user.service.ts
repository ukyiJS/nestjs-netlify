import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { query } from '@/utils';
import { FindUserArgs } from './dto/find-user.args';
import { UserArgs } from './dto/user.args';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: MongoRepository<User>;

  findUsers(user: FindUserArgs): Promise<User[]> {
    return this.userRepository.find({ where: query(user) });
  }

  saveUser(user: UserArgs): Promise<User> {
    return this.userRepository.save(user);
  }
}
