import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsBoolean, Min, Max } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({example: 'SUMMER2024'})
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({example: 15.5})
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({example: new Date('2024-12-31')})
  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @ApiProperty({example: true})
  @IsBoolean()
  isActive: boolean;
}
