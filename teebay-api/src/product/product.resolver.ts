import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductType } from './dto/product.type';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductPaginatedType } from './dto/product-paginated.type';
import { CategoryType } from './dto/category.type';
import { RentType } from '@prisma/client';

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

  @Query(() => ProductPaginatedType)
  async products(
    @Args('page', { type: () => Int, nullable: true }) page = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit = 10,
  ) {
    return this.productService.findAll({ page, limit });
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Args('ownerId', { type: () => Int }) ownerId: number,
    @Args('input') input: CreateProductInput,
  ) {
    return this.productService.create(ownerId, input);
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => Int }) id: number) {
    await this.productService.delete(id);
    return true;
  }

  @Query(() => [CategoryType])
  async categories() {
    return this.productService.getAllCategories();
  }

  @Query(() => [RentType])
  rentTypes(): RentType[] {
    return Object.values(RentType);
  }

}
