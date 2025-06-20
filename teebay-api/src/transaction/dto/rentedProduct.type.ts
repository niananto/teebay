import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ProductType } from 'src/product/dto/product.type';

@ObjectType()
export class RentedProductType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => Date)
  rent_start: Date;

  @Field(() => Date)
  rent_end: Date;
}
