import { Controller, Post, Body } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { Users } from '../users/entities/user.entity';

@ApiTags('Authentication')
@Controller('authGlobal')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'Realiza el Login y devuelve el Token de autenicacion',
  })
  @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
  // prueba
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar Loguear el Usuario',
  })
  @ApiBadRequestResponse({ description: 'Usuario o Clave incorrectos' })
  async signin(
    @Body() userLogin: LoginUserDto,
  ): Promise<Partial<Users> & { token: string }> {
    return await this.authGlobalService.signin(userLogin);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registra usuarios nuevos' })
  @ApiBody({
    description: 'Ingrese todos los datos requeridos',
    type: CreateUserDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar Registrar el Usuario',
  })
  @ApiBadRequestResponse({
    description:
      'Si el usuario esta en al Base de Datos: El usuario ya existe / Si las contrseñas no son iguales: La contraseña y su confirmacion no cohinciden',
  })
  async signup(@Body() user: CreateUserDto): Promise<Omit<Users, 'password'>> {
    return await this.authGlobalService.signup(user);
  }
}
