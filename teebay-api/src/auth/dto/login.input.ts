import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  handle: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
