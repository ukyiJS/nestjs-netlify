import { Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  @Inject()
  private readonly appService: AppService;

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
