import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsUUID, Min, Max } from 'class-validator';
export class CreateCouponDto {
  @ApiProperty({ example: 'SUMMER2024' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  valorPesos: number;

  @ApiProperty({ example: 15.5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  valorPorc: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  used: boolean;
}
