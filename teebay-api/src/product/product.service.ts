import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  async findAll({ page = 1, limit = 10 }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          categories: true,
          images: true,
          owner: true,
        },
        orderBy: { created: 'desc' },
      }),
      this.prisma.product.count(),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
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

  async update(id: number, input: UpdateProductInput) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        rent: input.rent,
        rent_type: input.rent_type,
        categories: input.categoryIds
          ? {
              set: input.categoryIds.map((id) => ({ id })),
            }
          : undefined,
        images: input.imageUrls
          ? {
              deleteMany: {}, // delete existing
              create: input.imageUrls.map((url) => ({ url })),
            }
          : undefined,
      },
      include: {
        categories: true,
        images: true,
      },
    });
  }

  async delete(id: number) {
    await this.prisma.productImage.deleteMany({ where: { product_id: id } });
    return this.prisma.product.delete({
      where: { id },
    });
  }

}
