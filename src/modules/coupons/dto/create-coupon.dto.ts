import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsBoolean, Min, Max } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    description: 'Código único del cupón',
    example: 'SUMMER2024',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Porcentaje de descuento del cupón',
    example: 15.5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({
    description: 'Fecha de expiración del cupón',
    example: '2024-12-31',
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @ApiProperty({
    description: 'Estado del cupón (activo/inactivo)',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
