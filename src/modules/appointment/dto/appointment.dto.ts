import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Fecha en la que se solicita el turno', example: '2024-01-10' })
  @IsNotEmpty()
  @Transform(({ value }) => value.split('T')[0]) // Esto convierte la fecha a 'YYYY-MM-DD'
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

  @ApiProperty({ description: 'Mascota a sacar turno', example: '091bed00-c361-44bc-ade3-dd628353cf55' })
  @IsNotEmpty()
  pet: { id: string };

  @ApiProperty({ description: 'Servicio a sacar turno', example: 'PerroService' })
  @IsNotEmpty()
  service: { service: string };

  @ApiPropertyOptional({ description: 'Estado del turno', example: '15fb8542-2511-462f-a549-bdbb030e01f4' })
  @IsNotEmpty()
  @IsOptional()
  state?: object;
}

export class EditAppointmentDto {
  @ApiPropertyOptional({ description: 'Fecha en la que se solicita el turno', example: new Date('2024-01-11') })
  @IsNotEmpty()
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
  @IsOptional()
  pet?: object;

  @ApiPropertyOptional({ description: 'Cambiar el servicio a sacar turno', example: 'PerroService2' })
  @IsNotEmpty()
  @IsOptional()
  service?: { service: string };
}
