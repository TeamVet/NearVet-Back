import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'DNI para iniciar sesion',
    example: '34678789',
  })
  @IsNotEmpty()
  @IsNumber()
  DNI: number;

  @ApiProperty({
    description: 'Contraseña para iniciar sesion',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
