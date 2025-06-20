import { Module } from '@nestjs/common';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
