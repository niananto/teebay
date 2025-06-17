import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  username: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;
}
