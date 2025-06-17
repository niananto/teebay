import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { RentType } from './enums';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rent: number;

  @Field(() => RentType)
  rent_type: RentType;

  @Field(() => [Int])
  @IsArray()
  categoryIds: number[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}
