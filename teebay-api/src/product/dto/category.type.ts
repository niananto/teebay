import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
