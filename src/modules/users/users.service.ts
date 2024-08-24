import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsersService(page: number, limit: number) {
    const users = await this.usersRepository.getUsersRepository(page, limit);
    return users.map(
      ({ password, userRole, ...userNoPassword }) => userNoPassword,
    );
  }

  async getUsersByEmailService(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.getUserByEmailRepository(email);
    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el email ${email}`,
      );
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUsersByIdService(id: string) {
    const user = await this.usersRepository.getUserByIdRepository(id);
    if (!user)
      throw new NotFoundException(`No se encontro el usuario con el id ${id}`);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUserService(
    user: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const newUser = await this.usersRepository.createUserRepository(user);
    return newUser;
  }

  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.updateUserRepository(
      id,
      updateUserDto,
    );
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async removeUserService(id: string) {
    const user = await this.usersRepository.removeUserRepository(id);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async unsubscribeUserService(id: string) {
    const user = await this.usersRepository.unsubscribeUserRepository(id);
    if (!user)
      throw new NotFoundException(`Usuario para dar de baja no encontrado`);
    user.endDate = new Date();
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

}
