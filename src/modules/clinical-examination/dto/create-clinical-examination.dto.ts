import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, MaxLength } from 'class-validator';

export class CreateClinicalExaminationDto {
  @ApiProperty({
    description: 'Anamnesis del examen clínico',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  anamnesis: string;

  @ApiProperty({
    description: 'Frecuencia cardíaca del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  fc: number;

  @ApiProperty({
    description: 'Frecuencia respiratoria del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  fr: number;

  @ApiProperty({
    description: 'Estado de las mucosas del paciente',
    type: String,
    maxLength: 30,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  mucous: string;

  @ApiProperty({
    description: 'Tiempo de llenado capilar (TLLC) del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  tllc: number;

  @ApiProperty({
    description: 'Temperatura corporal del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  temperature: number;

  @ApiProperty({
    description: 'Nivel de hidratación del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  hydration: number;

  @ApiProperty({
    description: 'Estado de ánimo del paciente',
    type: String,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  moodState: string;

  @ApiProperty({
    description: 'Temperamento del paciente',
    type: String,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  temper: string;

  @ApiProperty({
    description: 'Diagnóstico del examen clínico',
    type: String,
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  diagnostico: string;

  @ApiProperty({
    description: 'ID de la mascota asociada al examen clínico',
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  petId: string;

  @ApiProperty({
    description: 'ID del veterinario que realizó el examen clínico',
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  veterinarianId: string;
}
