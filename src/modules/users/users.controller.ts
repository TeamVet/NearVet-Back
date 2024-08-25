import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsersService(Number(page), Number(limit));
  }

  @Get('search-by-email')
  getUsersByEmail(
    @Query(':email') email: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByEmailService(email);
  }

  @Get('search-by-dni')
  getUsersByDni(
    @Query(':dni') dni: number,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByDniService(dni);
  }

  @Get(':id')
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersByIdService(id);
  }

  @Put(':id')
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
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUserService(id);
  }

  /*
    @Post('send-email')
    async sendEmail(@Body() sendEmailDto: SendEmailDto) {
      await this.usersService.sendEmail(sendEmailDto);
      return { message: 'Email sent successfully' };
    }
    */
}
