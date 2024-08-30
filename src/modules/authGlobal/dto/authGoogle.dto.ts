import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthGoogleDto {

  @ApiProperty({description: 'Debe ser un email valido', example: 'example@example.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'Debe ser un email valido', example: new Date()})
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiPropertyOptional({description: 'Debe ser un email valido', example: 'example@example.com'})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({description: 'Debe ser un email valido', example: 'example@example.com'})
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({description: 'Debe ser un email valido', example: 'example@example.com'})
  @IsOptional()
  @IsString()
  imgProfile?: string;

}
