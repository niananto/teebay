import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getUserTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [{ owner_id: userId }, { receiver_id: userId }],
      },
      include: {
        product: true,
        buy_transaction: true,
        rent_transaction: true,
      },
    });
  }
}
