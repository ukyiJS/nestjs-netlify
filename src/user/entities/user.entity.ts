import { ObjectType } from '@nestjs/graphql';
import { Exclude, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { v4 } from 'uuid';
import { CardType, GenderType } from '@/types/user';

@ObjectType()
class Card {
  type: CardType;
  number: string;
}

@Entity()
@ObjectType()
export class User {
  @Exclude()
  @ObjectIdColumn({ type: 'uuid' })
  _id: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  gender: GenderType;
  @Column()
  email: string;
  @Column()
  city: string;
  @Column()
  image: string;
  @Column()
  card: Card;
  @Column()
  languages: string[];
  @Exclude()
  @Column()
  createdAt: Date;

  constructor(user: Partial<User>) {
    if (user?.name) return;

    Object.assign(this, plainToClass(User, user));
    this._id ??= v4();
    this.createdAt ??= new Date();
  }
}
