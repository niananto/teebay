import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(owner_id: number, input: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        rent: input.rent,
        rent_type: input.rent_type,
        is_available: true,
        owner: { connect: { id: owner_id } },
        categories: {
          connect: input.categoryIds.map((id) => ({ id })),
        },
        images: {
          create: input.imageUrls?.map((url) => ({ url })),
        },
      },
      include: {
        categories: true,
        images: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        categories: true,
        images: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        images: true,
      },
    });
  }

  async findAllByOwnerId(ownerId: number) {
    return this.prisma.product.findMany({
      where: { owner_id: ownerId },
      include: {
        categories: true,
        images: true,
      },
    });
  }
}
