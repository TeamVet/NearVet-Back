import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Fecha en la que se solicita el turno', example: new Date('2024-01-10') })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Hora en la que se solicita el turno', example: '08:30' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato de hora incorrecto' }) // Valida formato de hora HH:mm
  time: string;

  @ApiProperty({ description: 'Mensaje del usuario para solicitar el turno', example: 'Mi perro no come' })
  @IsNotEmpty()
  @IsString()
  messageUser: string;

  @ApiProperty({ description: 'Precio del turno', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Mascota a sacar turno', example: 'Firulais' })
  @IsNotEmpty()
  @IsObject()
  pet: object;

  @ApiProperty({ description: 'Servicio a sacar turno', example: 'PerroService' })
  @IsNotEmpty()
  @IsObject()
  service: object;

  @ApiPropertyOptional({ description: 'Estado del turno', example: 'Pendiente' })
  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  state?: object;
}

export class EditAppointmentDto {
  @ApiPropertyOptional({ description: 'Fecha en la que se solicita el turno', example: new Date('2024-01-11') })
  @IsNotEmpty()
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({ description: 'Hora en la que se solicita el turno', example: '08:30' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato de hora incorrecto' }) // Valida formato de hora HH:mm
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ description: 'Mensaje del usuario para editar el turno', example: 'Mi perro no caga' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  messageUser?: string;

  @ApiPropertyOptional({ description: 'Editar mascota a sacar turno', example: 'Pichichen' })
  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  pet?: object;

  @ApiPropertyOptional({ description: 'Cambiar el servicio a sacar turno', example: 'PerroService2' })
  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  service?: object;
}
