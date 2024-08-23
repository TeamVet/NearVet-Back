import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  /** Un mail, no debe  estar vacio
    @example 'Test@mail.com'
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** El password para loguearse
    @example 'AAbb11##'
  */
  @IsNotEmpty()
  @IsString()
  password: string;
}
