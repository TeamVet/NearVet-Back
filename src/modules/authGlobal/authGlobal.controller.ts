import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserWebDto } from '../users/dto/createUserWeb.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../users/entities/user.entity';
import { AuthGoogleDto } from './dto/authGoogle.dto';

@ApiTags('Authentication')
@Controller('authGlobal')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post('signin')
  @ApiOperation({summary: 'Realiza el Login de usuarios',
                description: `Esta ruta realiza el login usando el DNI y el password, retornando los 
                              datos del usuario y un token de autenticacion`})
  @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({description: 'Error al intentar Loguear el Usuario' })
  @ApiBadRequestResponse({ description: 'Usuario o Clave incorrectos' })
  async signin(
    @Body() userLogin: LoginUserDto,
  ): Promise<Omit<User, 'password'> & { token: string }> {
    return await this.authGlobalService.signin(userLogin);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Registra usuarios nuevos',
    description: `Esta ruta registra los usuarios nuevos en NearVet,y se retornarán los datos del usuario. 
                  Si se carga el 'email', se enviara un correo de bienvenida. Los datos requeridos son 
                  ('name' , 'lastname' , 'startDate' , 'dni' , 'role' , 'password' , 'passwordConfirm')`})
  @ApiBody({description: 'Ingrese todos los datos requeridos', type: CreateUserWebDto})
  @ApiInternalServerErrorResponse({description: 'Error al intentar Registrar el Usuario'})
  @ApiBadRequestResponse({description: `El usuario ya existe`})
  async signup(@Body() user: CreateUserWebDto): Promise<Omit<User, 'password' | 'role'>> {
    return await this.authGlobalService.signup(user);
  }

  @Post('signupGoogle')
  @ApiOperation({
    summary: 'Registra y loguea usuarios desde su cuenta de Google',
    description: `Esta ruta registra los usuarios nuevos desde Google en NearVet, y se retornarán los datos 
                  del usuario junto con un token de seguridad. Envia un correo de Bienvenida sugiriendo que 
                  cambie su clave por defecto. Datos obligatorios son 'name' , 'lastname' , 'email', 'startDate', 'imgProfile'
                  de los cuales solo son obligatorios en 'email' y 'startDate'`})
  @ApiBody({description: 'Ingrese todos los datos requeridos', type: AuthGoogleDto})
  @ApiInternalServerErrorResponse({description: 'Error al intentar Registrar el Usuario'})
  @ApiBadRequestResponse({description: `El usuario ya existe`})
  async authGoogle(@Body() user: AuthGoogleDto): Promise<Omit<User, 'password'> & { token: string }> {
    return await this.authGlobalService.signupGoogle(user);
  }

}
