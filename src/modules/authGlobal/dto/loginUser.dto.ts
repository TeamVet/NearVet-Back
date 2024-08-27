import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'DNI para iniciar sesion',
    example: '34576894',
  })
  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @ApiProperty({
    description: 'Contraseña para iniciar sesion',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
