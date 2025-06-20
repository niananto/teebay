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
    categories.map(async (name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );
  console.log('✅ Categories seeded');

  const user = await prisma.user.upsert({
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
  });
  console.log('✅ User seeded:', user.username);

  const electronicsCategory = categoryRecords.find(c => c.name === 'ELECTRONICS');
  const booksCategory = categoryRecords.find(c => c.name === 'BOOKS');

  await prisma.product.create({
    data: {
      name: 'iPhone 15',
      description: 'A brand new smartphone with warranty.',
      price: 600,
      rent: 15,
      rent_type: RentType.DAILY,
      owner_id: user.id,
      categories: {
        connect: [{ id: electronicsCategory?.id }],
      },
      images: {
        create: [
          { url: 'https://example.com/images/smartphone.jpg' },
        ],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'The Great Gatsby',
      description: 'Classic novel in excellent condition.',
      price: 20,
      rent: 2,
      rent_type: RentType.WEEKLY,
      owner_id: user.id,
      categories: {
        connect: [{ id: booksCategory?.id }],
      },
      images: {
        create: [
          { url: 'https://example.com/images/gatsby.jpg' },
        ],
      },
    },
  });
  console.log('✅ Products seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
