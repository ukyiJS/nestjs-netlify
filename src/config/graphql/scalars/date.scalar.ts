import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { convertLocalDateToUTCDate, convertUTCDateToLocalDate } from '@/utils';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  public description = 'Date custom scalar type';

  public parseValue(value: number): Date {
    return convertUTCDateToLocalDate(new Date(value)); // value from the client
  }

  public serialize(value: Date): number {
    return +convertLocalDateToUTCDate(value); // value sent to the client
  }

  public parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) return convertUTCDateToLocalDate(new Date(ast.value));
    return null;
  }
}
