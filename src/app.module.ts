import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { DateScalar, GraphqlService, TypeormService, validate } from '@/config';
import { UserModule } from '@/user/user.module';

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
