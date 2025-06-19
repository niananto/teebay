import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BuyTransaction {
  @Field(() => Int)
  transaction_id: number;

  @Field(() => Int)
  price: number;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  modified: Date;
}