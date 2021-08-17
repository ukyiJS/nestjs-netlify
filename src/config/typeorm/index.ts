import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { getEnv } from '@/utils';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  createTypeOrmOptions = async (): Promise<TypeOrmModuleOptions> => ({
    type: 'mongodb',
    url: getEnv('DATABASE_URL'),
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: true,
    keepConnectionAlive: true,
  });
}
