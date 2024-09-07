import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { passwordCompare } from '../../../decorators/comparePass.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'El nombre es Opcional',
    example: 'Carlos',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    description: 'El Apellido es Opcional',
    example: 'Amadeo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiPropertyOptional({
    description: 'El DNI es Opcional',
    example: '34576894',
  })
  @IsOptional()
  @IsNumber()
  dni: number;

  @ApiPropertyOptional({
    description: 'Debe ser un email válido',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  email: string;

  // @ApiProperty({
  //   description:
  //     'La contraseña debe tener almenos 6 caracteres, una mayuscula, una minuscula y un caracter especial',
  //   example: 'pruEba123&%',
  // })
  // @IsNotEmpty()
  // @IsString()
  // @Length(8, 15)
  // @IsStrongPassword({
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  // password: string;

  // @ApiProperty({
  //   description:
  //     'La confirmacion del password es Obligatoria. Debe coincidir con password.',
  //   example: 'pruEba123&%',
  // })
  // @IsNotEmpty()
  // @Validate(passwordCompare, ['password'])
  // passwordConfirm: string;

  @ApiPropertyOptional({
    description: 'La fecha de nacimiento es opcional',
    example: new Date('1/2/2024'),
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiPropertyOptional({
    description: 'El numero de telefono es opcional, Ingresar solo numeros',
    example: '1168775654',
  })
  @IsNumber()
  @IsOptional()
  phone: number;

  @ApiPropertyOptional({
    description: 'La dirección del domicilio es Opcional',
    example: 'Avenida Importante 4000',
  })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  address: string;

  @ApiPropertyOptional({
    description: `La ciudad es Opcional.`,
    example: 'Example City',
  })
  @IsOptional()
  @IsString()
  city: string; 
}
