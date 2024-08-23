import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { UserRole } from "../entities/userRole.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El nombre de usuario es obligatorio.",
        example: "Hernesto",
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El Apellido es Obligatorio.",
        example: "Harris",
    })
    lastname: string

    @IsNotEmpty()
    @IsEmail()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El Email es obligatorio, y debe ser un email valido.",
        example: "Harris@gmail.com",
    })
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
    @ApiProperty({
        description: "El password es Obligatorio.",
        example: "Harris.0",
    })
    password: string 

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
    @ApiProperty({
        description: "debe ser igual al password.",
        example: "Harris.0",
    })
    passwordConfirm: string

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
        description: "La fecha de Nacimietno.",
        example: "10/10/1988",
    })
    birthdate: Date;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
        description: "Fecha actual de creacion del usuario.",
        example: "22/02/2024",
    })
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsNumber()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
    @ApiProperty({
        description: "Numero de telefono. Solo numeros",
        example: "1145673456",
    })
    phone: number 

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
    @ApiProperty({
        description: "Direccion del titular.",
        example: "Aristobulo 2456",
    })
    address: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
    @ApiProperty({
        description: "Localidad del titular.",
        example: "Moreno",
    })
    city: string

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        description: "Aqui van los roles de Usuarios para este usuario.",
        example: "[{id: 'asderf45-asde4-sfg65-sdfghgh56' , role: 'Admin'}]",
    })
    userRoles: UserRole[];

}
