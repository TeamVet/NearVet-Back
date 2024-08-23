import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { Role } from '../roles/roles.enum';
import { passwordCompare } from '../../../decorators/comparePass.decorator';

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

  @ApiPropertyOptional({
    description: 'Debe ser un email válido',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsOptional()
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
    description: 'La confirmacion del password es Obligatoria. Debe coincidir con password.',
    example: 'pruEba123&%',
  })
  @IsNotEmpty()
  @Validate(passwordCompare, ['password'])
  passwordConfirm: string;

  @ApiPropertyOptional({
    description: 'La fecha de nacimiento es opcional',
    example: new Date('01/08/1988'),
  })
  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    description: 'La fecha de inicio es obligatoria',
    example: new Date('01/08/024'),
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

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
    description: `El Rol es obligatoria. Sus valores pueden ser: ${Role.AdminVet}, ${Role.User} o ${Role.Veterinarian}`,
    example: 'user',
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiPropertyOptional({
    description: `La ciudad es Opcional.`,
    example: 'Example City',
  })
  @IsOptional()
  @IsString()
  city: string;
}
