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

  @ApiProperty({ description: 'Mascota a sacar turno', example: '4418276c-ef71-4e7a-bb80-a52458996a06' })
  @IsNotEmpty()
  pet_id: { id: string };

  @ApiProperty({ description: 'Servicio a sacar turno', example: '83c47570-47ee-4fe7-8b7e-a8416947b58a' })
  @IsNotEmpty()
  service_id: { id: string };
}

export class EditAppointmentDto {
  @ApiPropertyOptional({ description: 'Fecha en la que se solicita el turno', example: '2024-01-11' })
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

  @ApiPropertyOptional({ description: 'Cambiar el servicio a sacar turno', example: '07bdc58c-a922-4237-a57d-99d1fc188fc1' })
  @IsNotEmpty()
  @IsOptional()
  service?: { id: string };
}
