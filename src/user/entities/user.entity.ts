import { ObjectType } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsUrl, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { v4 } from 'uuid';
import { convertLocalDateToUTCDate, Hash } from '@/utils';
import { GenderType } from '../user.interface';
import { Card } from './card.entity';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn({ type: 'uuid' })
  _id?: string;

  @Column()
  name: string;

  @Column()
  @Length(6, 12, { message: '비밀번호는 6글자 이상 12글자 이하여야 합니다.' })
  password: string;

  @BeforeInsert()
  private hashPassword():void {
    this.password = Hash.make(this.password);
  }

  @Column()
  @IsEnum(GenderType, { message: '잘못된 성별입니다.' })
  gender: GenderType;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  @IsUrl(undefined, { message: '잘못된 이미지 URL 형식입니다' })
  image: string;

  @Column()
  card: Card;

  @Column()
  languages: string[];

  @Column()
  createdAt?: Date;

  constructor(user: Partial<User>) {
    if (!user?.name) return;

    Object.assign(this, plainToClass(User, user));
    this._id ??= v4();
    this.createdAt ??= convertLocalDateToUTCDate(new Date());
  }
}
