import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsersService(Number(page), Number(limit));
  }

  @Get('search')
  getUsersByEmail(@Query(':email') email: string) {
    return this.usersService.getUsersByEmailService(email);
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUsersByIdService(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUserService(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserService(id, updateUserDto);
  }

  /*
    // CREAR DAR DE BAJA (AGREGAR FECHA DE BAJA EN endDate)
    @Put('unsubscribe')
    unsubscribeUser(@Param('email') email: string){
      return this.usersService.unsubscribeUserService(email)
    }
    */

  // CREAR DELETE (borrar de bd)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
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
