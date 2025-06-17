import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductType } from './dto/product.type';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductType, { nullable: true })
  async product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findById(id);
  }

  @Query(() => [ProductType])
  async productsByOwnerId(@Args('ownerId', { type: () => Int }) ownerId: number) {
    return this.productService.findAllByOwnerId(ownerId);
  }

  @Query(() => [ProductType])
  async products() {
    return this.productService.findAll();
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Args('ownerId', { type: () => Int }) ownerId: number,
    @Args('input') input: CreateProductInput,
  ) {
    return this.productService.create(ownerId, input);
  }
}
