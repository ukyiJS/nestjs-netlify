import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';
import { getEnv } from '@/utils';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  getEntities(): any[] {
    const isNetlifyBuild = getEnv('NETLIFY_BUILD') === 'true';
    if (!isNetlifyBuild) return [join(process.cwd(), 'dist/src', '**/**.entity.{t,j}s')];

    return [User];
  }

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      url: getEnv('DATABASE_URL'),
      entities: this.getEntities(),
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
      keepConnectionAlive: true,
    };
  }
}
