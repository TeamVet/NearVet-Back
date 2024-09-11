import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MercadoPagoDTO {
  @ApiProperty({
    description: 'Titulo del servicio a agregar a mercado pago',
    example: 'Castración',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Cantidad del servicio (Por lo general es 1 y viene de la DB)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Precio del servicio (Por lo genera viene de la DB)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
