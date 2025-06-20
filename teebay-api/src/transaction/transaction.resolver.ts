import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { TransactionDetailsType } from './dto/transaction.type';
import { ProductType } from '../product/dto/product.type';
import { RentedProductType } from './dto/rentedProduct.type';
import { BuyInput } from './dto/buy.input';
import { RentInput } from './dto/rent.input';

@Resolver(() => TransactionDetailsType)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [TransactionDetailsType])
  myTransactions(@Args('userId', { type: () => Int }) userId: number) {
    return this.transactionService.getUserTransactions(userId);
  }

  @Mutation(() => TransactionDetailsType)
  buy(@Args('buyInput') buyInput: BuyInput) {
    return this.transactionService.buy(buyInput);
  }

  @Mutation(() => TransactionDetailsType)
  rent(@Args('rentInput') rentInput: RentInput) {
    return this.transactionService.rent(rentInput);
  }

  @Query(() => [ProductType])
  boughtProducts(@Args('userId', { type: () => Int }) userId: number) {
    return this.transactionService.getBoughtProducts(userId);
  }

  @Query(() => [ProductType])
  soldProducts(@Args('userId', { type: () => Int }) userId: number) {
    return this.transactionService.getSoldProducts(userId);
  }

  @Query(() => [RentedProductType])
  borrowedProducts(@Args('userId', { type: () => Int }) userId: number) {
    return this.transactionService.getBorrowedProducts(userId);
  }

  @Query(() => [RentedProductType])
  lentProducts(@Args('userId', { type: () => Int }) userId: number) {
    return this.transactionService.getLentProducts(userId);
  }


}
