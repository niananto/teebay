import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TransactionType as TrxType } from '../../common/enums';
import { BuyTransaction } from './buyTransaction.type';
import { RentTransaction } from './rentTransaction.type';

@ObjectType()
export class TransactionDetailsType {
  @Field(() => Int)
  id: number;

  @Field()
  trx_id: string;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  owner_id: number;

  @Field(() => Int)
  receiver_id: number;

  @Field(() => TrxType)
  type: TrxType;

  @Field(() => BuyTransaction, { nullable: true })
  buy_transaction?: BuyTransaction;

  @Field(() => RentTransaction, { nullable: true })
  rent_transaction?: RentTransaction;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  modified: Date;
}
