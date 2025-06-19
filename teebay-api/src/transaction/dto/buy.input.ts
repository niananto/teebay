import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class BuyInput {
  @Field(() => Int)
  product_id: number;
  
  @Field(() => Int)
  receiver_id: number;
}
