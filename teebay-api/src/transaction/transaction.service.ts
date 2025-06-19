import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyInput } from './dto/buy.input';
import { RentInput } from './dto/rent.input';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async buy(input: BuyInput) {
    const product = await this.prisma.product.findUnique({
      where: { id: input.product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        is_available: false,
        owner_id: input.receiver_id,
      },
    });

    return this.prisma.transaction.create({
      data: {
        type: TransactionType.BUY,
        product: { connect: { id: input.product_id } },
        owner: { connect: { id: product.owner_id } },
        receiver: { connect: { id: input.receiver_id } },
        buy_transaction: {
          create: {
            price: product.price,
          },
        },
      },
      include: {
        buy_transaction: true,
      },
    });
  }

  async rent(input: RentInput) {
    const product = await this.prisma.product.findUnique({
      where: { id: input.product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (input.rent_end <= input.rent_start) {
      throw new BadRequestException('End date must be after start date');
    }

    // todo: adding overlap logic to check for conflicting rentals

    return this.prisma.transaction.create({
      data: {
        type: TransactionType.RENT,
        product: { connect: { id: input.product_id } },
        owner: { connect: { id: product.owner_id } },
        receiver: { connect: { id: input.receiver_id } },
        rent_transaction: {
          create: {
            rent: product.rent,
            rent_type: product.rent_type,
            rent_start: input.rent_start,
            rent_end: input.rent_end,
          },
        },
      },
      include: {
        rent_transaction: true,
      },
    });
  }

  async getUserTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          { owner_id: userId },
          { receiver_id: userId },
        ],
      },
      include: {
        buy_transaction: true,
        rent_transaction: true,
      },
    });
  }
}
