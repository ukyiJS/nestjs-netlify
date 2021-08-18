import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar, GraphqlService, TypeormService, validate } from '@/config';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    GraphQLModule.forRootAsync({ useClass: GraphqlService }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [DateScalar, AppService, AppResolver],
})
export class AppModule {
}
