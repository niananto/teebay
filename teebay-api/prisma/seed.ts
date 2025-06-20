import { PrismaClient, RentType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    'ELECTRONICS',
    'FURNITURE',
    'HOME APPLIANCES',
    'SPORTING GOODS',
    'OUTDOOR',
    'TOYS',
    'BOOKS',
    'GARDENING',
    'SKINCARE',
  ];

  const categoryRecords = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  console.log('✅ Categories seeded');

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        phone: '0123456789',
        email: 'john@example.com',
        auth: {
          create: {
            encrypted_password: await bcrypt.hash('1234', 10),
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        first_name: 'Alice',
        last_name: 'Smith',
        username: 'alicesmith',
        phone: '0192837465',
        email: 'alice@example.com',
        auth: {
          create: {
            encrypted_password: await bcrypt.hash('password', 10),
          },
        },
      },
    }),
  ]);
  console.log('✅ Users seeded:', users.map(u => u.username).join(', '));

  const [john, alice] = users;

  // Utility to get category ID
  const getCatId = (name: string) =>
    categoryRecords.find((c) => c.name === name)?.id!;

  const products = [
    {
      name: 'iPhone 15',
      description: 'A brand new smartphone with warranty.',
      price: 1200,
      rent: 30,
      rent_type: RentType.DAILY,
      owner_id: john.id,
      category: 'ELECTRONICS',
      image: 'https://example.com/images/iphone15.jpg',
    },
    {
      name: 'MacBook Pro',
      description: '16-inch, M3 Pro chip, 2024 model.',
      price: 2500,
      rent: 70,
      rent_type: RentType.DAILY,
      owner_id: john.id,
      category: 'ELECTRONICS',
      image: 'https://example.com/images/macbook.jpg',
    },
    {
      name: 'Wooden Dining Table',
      description: '6-seater solid oak table.',
      price: 800,
      rent: 25,
      rent_type: RentType.WEEKLY,
      owner_id: alice.id,
      category: 'FURNITURE',
      image: 'https://example.com/images/table.jpg',
    },
    {
      name: 'Refrigerator',
      description: 'Energy-efficient, double-door fridge.',
      price: 1000,
      rent: 20,
      rent_type: RentType.WEEKLY,
      owner_id: john.id,
      category: 'HOME APPLIANCES',
      image: 'https://example.com/images/fridge.jpg',
    },
    {
      name: 'Treadmill',
      description: 'Foldable home treadmill with heart-rate monitor.',
      price: 500,
      rent: 10,
      rent_type: RentType.DAILY,
      owner_id: alice.id,
      category: 'SPORTING GOODS',
      image: 'https://example.com/images/treadmill.jpg',
    },
    {
      name: 'Camping Tent',
      description: '4-person waterproof tent.',
      price: 120,
      rent: 8,
      rent_type: RentType.DAILY,
      owner_id: john.id,
      category: 'OUTDOOR',
      image: 'https://example.com/images/tent.jpg',
    },
    {
      name: 'Lego Classic Set',
      description: '500-piece building blocks.',
      price: 50,
      rent: 3,
      rent_type: RentType.WEEKLY,
      owner_id: alice.id,
      category: 'TOYS',
      image: 'https://example.com/images/lego.jpg',
    },
    {
      name: 'The Great Gatsby',
      description: 'Classic novel in excellent condition.',
      price: 20,
      rent: 2,
      rent_type: RentType.WEEKLY,
      owner_id: john.id,
      category: 'BOOKS',
      image: 'https://example.com/images/gatsby.jpg',
    },
    {
      name: 'Lawn Mower',
      description: 'Electric lawn mower for small to medium yards.',
      price: 200,
      rent: 12,
      rent_type: RentType.DAILY,
      owner_id: alice.id,
      category: 'GARDENING',
      image: 'https://example.com/images/mower.jpg',
    },
    {
      name: 'Vitamin C Serum',
      description: 'For glowing and youthful skin.',
      price: 25,
      rent: 1,
      rent_type: RentType.WEEKLY,
      owner_id: john.id,
      category: 'SKINCARE',
      image: 'https://example.com/images/serum.jpg',
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        rent: p.rent,
        rent_type: p.rent_type,
        owner_id: p.owner_id,
        categories: { connect: [{ id: getCatId(p.category) }] },
        images: { create: [{ url: p.image }] },
      },
    });
  }

  console.log('✅ Products seeded:', products.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
