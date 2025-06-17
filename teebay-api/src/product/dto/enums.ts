import { registerEnumType } from '@nestjs/graphql';
import { RentType } from '@prisma/client';

registerEnumType(RentType, {
  name: 'RentType',
});
export { RentType };