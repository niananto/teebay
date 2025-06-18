import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { RentType } from './enums';
import { CategoryType } from './category.type';

@ObjectType()
export class ProductType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rent: number;

  @Field(() => RentType)
  rent_type: RentType;

  @Field()
  is_available: boolean;

  @Field()
  created: Date;

  @Field(() => [CategoryType])
  categories: CategoryType[];
}
