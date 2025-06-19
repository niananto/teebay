import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RentInput {
  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  receiver_id: number;

  @Field()
  rent_start: Date;

  @Field()
  rent_end: Date;
}
