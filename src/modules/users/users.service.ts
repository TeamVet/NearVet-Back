import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsersService(page: number, limit: number) {
    return this.usersRepository.getUsersRepository(page, limit);
  }

  async getUsersByEmailService(email: string): Promise<Omit<Users, "password">> {
    const user = await this.usersRepository.getUserByEmailRepository(email);
    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el email ${email}`,
      );
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  getUsersByIdService(id: string) {
    return this.usersRepository.getUserByIdRepository(id);
  }

  createUserService(user: Partial<Users>): Promise<Omit<Users , "password">> {
    return this.usersRepository.createUserRepository(user);
  }

  updateUserService(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUserRepository(id, updateUserDto);
  }

  removeUserService(id: string) {
    return this.usersRepository.removeUserRepository(id);
  }

  unsubscribeUserService(id: string) {
    return this.usersRepository.unsubscribeUserRepository(id);
  }

  /*
  sendEmail(sendEmailDto: SendEmailDto) {
    return this.usersRepository.notifyUser(sendEmailDto);
  }
  */
}
