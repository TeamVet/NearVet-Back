import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { passwordCompare } from 'src/decorators/comparePass.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre es obligatorio',
    example: 'Carlos',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: 'El apellido es obligatorio',
    example: 'Mendoza',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiProperty({
    description: 'Debe ser un email válido',
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @ApiProperty({
    description:
      'La contraseña debe tener almenos 6 caracteres, una mayuscula, una minuscula y un caracter especial',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    description: 'Repetir la contraseña',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @Validate(passwordCompare, ['password'])
  passwordConfirm: string;

  @ApiProperty({
    description: 'La fecha de nacimiento es obligatoria',
    example: 'Carlos',
  })
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({
    description: 'La fecha de inicio es obligatoria',
    example: '01-08-2024',
  })
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsNotEmpty()
  endDate?: string;

  @ApiProperty({
    description: 'El numero de telefono es obligatorio',
    example: '54 9 123 456 7890',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    description: 'La dirección del domicilio es obligatoria',
    example: 'Avenida Importante 4000',
  })
  @IsString()
  @Length(1, 255)
  address: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  cityId?: string;
}
