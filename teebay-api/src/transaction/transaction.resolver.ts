import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { TransactionDetailsType } from './dto/transaction.type';
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
}
