import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Number of items to return per page',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description:
      'Number of items to skip before starting to collect the result set',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
