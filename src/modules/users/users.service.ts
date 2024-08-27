/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { Role } from './roles/roles.enum';

@Injectable()
export class UsersService {
  
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getUsersService(page: number, limit: number) {
    const users = await this.usersRepository.getUsersRepository(page, limit);
    if (users.length === 0)
      throw new NotFoundException(`Por el momento no hay usuarios registrados`);
    return users.map(({ password, role, ...userNoPassword }) => userNoPassword);
  }

  async getRolesUsersService() {
    return await this.usersRepository.getRolesUsersRepository();
  }

  async getRolesUsersByRoleService(role: Role) {
    return await this.usersRepository.getRolesUsersByRoleRepository(role);
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

  async getUsersByDniService(dni: number) {
    const user = await this.usersRepository.getUserByDniRepository(dni);
    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el dni ${dni}`,
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

  async uploadImgProfileService(id: string, file: Express.Multer.File) {
    const user = await this.usersRepository.getUserByIdRepository(id);
    if (!user)
      throw new BadRequestException(
        'El usuario que desea actualizar no existe',
      );
    const imgUpload = await this.cloudinaryService.uploadImage(file);
    await this.usersRepository.updateUserRepository(id, {
      imgProfile: imgUpload.secure_url,
    });
    return await this.usersRepository.getUserByIdRepository(id);
  }
}
