import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('Authentication')
@Controller('authGlobal')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'Realiza el Login de usuarios',
    description: `Esta ruta realiza el login usando el DNI y el password, 
                        retornando los datos del usuario y un token de autenticacion`,
  })
  @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar Loguear el Usuario',
  })
  @ApiBadRequestResponse({ description: 'Usuario o Clave incorrectos' })
  async signin(
    @Body() userLogin: LoginUserDto,
  ): Promise<Omit<User, 'password'> & { token: string }> {
    return await this.authGlobalService.signin(userLogin);
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Registra usuarios nuevos',
    description: `Esta ruta registra los usuarios nuevos en NearVet,
                              y se retornarán los datos del usuario. Si se carga el 'email', 
                              se enviara un correo de bienvenida. Los datos requeridos son 
                              ('name' , 'lastname' , 'startDate' , 'dni' , 'role' , 'password' , 'passwordConfirm')`,
  })
  @ApiBody({
    description: 'Ingrese todos los datos requeridos',
    type: CreateUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar Registrar el Usuario',
  })
  @ApiBadRequestResponse({
    description: `Si el usuario esta en al Base de Datos: 
          El usuario ya existe / Si las contrseñas no son iguales: 
          La contraseña y su confirmacion no cohinciden`,
  })
  async signup(@Body() user: CreateUserDto): Promise<Omit<User, 'password' | 'role'>> {
    return await this.authGlobalService.signup(user);
  }
}
