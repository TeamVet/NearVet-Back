import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiParam, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from './roles/roles.enum';
import { AuthGuard } from '../authGlobal/guards/Auth.guard';
import { RolesGuard } from './roles/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página para la paginación', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de resultados por página', type: Number })
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsersService(Number(page), Number(limit));
  }

  @Get('userRoles')
  @ApiOperation({ summary: 'Obtener todos los roles de usuarios' })
  getRolesUsers() {
    return this.usersService.getRolesUsersService();
  }

  @Get('userRoles/:role')
  @ApiOperation({ summary: 'Obtener usuarios por rol específico' })
  @ApiParam({ name: 'role', description: 'Rol del usuario', enum: Role })
  getRolesUsersByRole(@Param('role') role: Role) {
    return this.usersService.getRolesUsersByRoleService(role);
  }

  @Get('search-by-email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar usuarios por email' })
  @ApiQuery({ name: 'email', required: true, description: 'Email del usuario a buscar', type: String })
  @ApiResponse({ status: 200, description: 'Retorna el usuario sin la contraseña' })
  getUsersByEmail(@Query('email') email: string): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByEmailService(email);
  }

  @Get('search-by-dni')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar usuarios por DNI' })
  @ApiQuery({ name: 'dni', required: true, description: 'DNI del usuario a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Retorna el usuario sin la contraseña' })
  getUsersByDni(@Query('dni') dni: number): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByDniService(dni);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Retorna el usuario' })
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersByIdService(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateUserDto, description: 'Datos a actualizar del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserService(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUserService(id);
  }

  @Put('imgProfile/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen de perfil de usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiBody({
    description: `Debe subir el Archivo de Imagen`,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Imagen de perfil subida exitosamente' })
  async uploadImgProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El Archivo debe ser menor a 200Kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('File', file);
    return await this.usersService.uploadImgProfileService(id, file);
  }
}
