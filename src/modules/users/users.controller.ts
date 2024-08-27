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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
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
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsersService(Number(page), Number(limit));
  }

  @Get("userRoles")
  getRolesUsers() {
    return this.usersService.getRolesUsersService();
  }

  @Get("userRoles/:role")
  getRolesUsersByRole(@Param("role") role:Role) {
    return this.usersService.getRolesUsersByRoleService(role);
  }

  @Get('search-by-email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUsersByEmail(
    @Query('email') email: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByEmailService(email);
  }

  @Get('search-by-dni')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUsersByDni(@Query('dni') dni: number): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByDniService(dni);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersByIdService(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserService(id, updateUserDto);
  }

  /*
    // CREAR DAR DE BAJA (AGREGAR FECHA DE BAJA EN endDate)
    @Put('unsubscribe/:id')
    unsubscribeUser(@Param('id', ParseUUIDPipe) id: string){
      return this.usersService.unsubscribeUserService(id)
    }
    */

  // CREAR DELETE (borrar de bd)
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUserService(id);
  }

  @Put('imgProfile/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
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
