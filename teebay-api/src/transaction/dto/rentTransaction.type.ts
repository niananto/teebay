import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RentType } from '@prisma/client';

@ObjectType()
export class RentTransaction {
  @Field(() => Int)
  transaction_id: number;

  @Field(() => Int)
  rent: number;

  @Field(() => RentType)
  rent_type: RentType;

  @Field(() => Date)
  rent_start: Date;

  @Field(() => Date)
  rent_end: Date;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  modified: Date;
}