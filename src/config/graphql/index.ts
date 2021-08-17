import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { Env, ObjectLiteral } from '@/types';
import { getEnv } from '@/utils';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  isDevelopment = (): boolean => getEnv('NODE_ENV') === Env.DEVELOPMENT;
  createGqlOptions = async (): Promise<GqlModuleOptions> => ({
    cors: true,
    autoSchemaFile: !this.isDevelopment() || join(process.cwd(), 'src/schema.gql'),
    introspection: true,
    sortSchema: true,
    debug: this.isDevelopment(),
    autoTransformHttpErrors: true,
    playground: true,
    buildSchemaOptions: {
      numberScalarMode: 'integer',
    },
    formatError({ extensions, ...error }) {
      const { code, response } = extensions ?? {};
      if (!response) return { ...error, code };

      const validations = (<ObjectLiteral[]>response.message);
      const validation = validations.reduce((acc, obj) => ({ ...acc, ...obj }), {});
      const [message] = Object.values(validation);

      return { ...response, code, message, validation };
    },
  });
}
