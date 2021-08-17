import { ArgsType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsUrl, Length } from 'class-validator';
import { GenderType } from '@/types/user';
import { CardInput } from '@/user/dto/card.input';

@ArgsType()
export class UserArgs {
  name: string;
  @Length(6, 12, { message: '비밀번호는 6글자 이상 12글자 이하여야 합니다.' })
  password: string;
  @IsEnum(GenderType, { message: '잘못된 성별입니다.' })
  gender: GenderType;
  @IsEmail(undefined, { message: '잘못된 이메일 형식입니다.' })
  email: string;
  city: string;
  @IsUrl(undefined, { message: '잘못된 이미지 URL 형식입니다' })
  image: string;
  card: CardInput;
  languages: string[];
  rowNumber: number;
}
