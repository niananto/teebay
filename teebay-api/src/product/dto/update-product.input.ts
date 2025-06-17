import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { RentType } from './enums';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  rent?: number;

  @Field(() => RentType, { nullable: true })
  @IsOptional()
  rent_type?: RentType;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  categoryIds?: number[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  imageUrls?: string[];
}
