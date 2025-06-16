import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
