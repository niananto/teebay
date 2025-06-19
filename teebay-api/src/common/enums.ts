import { registerEnumType } from '@nestjs/graphql';
import { TransactionType, RentType } from '@prisma/client';

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

registerEnumType(RentType, {
  name: 'RentType',
});

export { RentType, TransactionType };