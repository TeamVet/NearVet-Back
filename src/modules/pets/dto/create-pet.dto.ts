import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsDateString, Length, IsOptional } from 'class-validator';

export class CreatePetDto {
    @ApiProperty({
        description: "El nombre es obligatorio",
        example: "Firulais"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({
        description: "La fecha de nacimiento es obligatoria",
        example: "01-07-2024"
    })
    @IsNotEmpty()
    @IsDateString()
    birthdate: string;

    @ApiProperty({
        description: "La fecha de ingreso en el sistema es obligatoria",
        example: "01-08-2024"
    })
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @ApiProperty({
        description: "El color es obligatorio",
        example: "Blanco"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    color: string;

    @IsOptional()
    @IsUUID()
    userId?: string;

    @IsOptional()
    @IsUUID()
    specieId?: string;

    @IsOptional()
    @IsUUID()
    raceId?: string;

    @IsOptional()
    @IsUUID()
    sexId?: string;
}
