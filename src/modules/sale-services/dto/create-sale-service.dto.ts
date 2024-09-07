import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDecimal, IsBoolean, IsNumber } from 'class-validator';

export class CreateSaleServiceDto {
  @ApiProperty({
    description: 'Nombre del servicio de venta',
    example: 'Servicio Premium',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del servicio de venta',
    example: 'Descripción detallada del servicio premium.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del servicio de venta',
    example: 99.99,
  })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El precio debe ser un número decimal válido' })
  price: number;

  @ApiProperty({
    description: 'Estado activo del servicio de venta',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}
