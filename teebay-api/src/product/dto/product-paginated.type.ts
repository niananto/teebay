import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType()
export class ProductPaginatedType {
  @Field(() => [ProductType])
  products: ProductType[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;
}
