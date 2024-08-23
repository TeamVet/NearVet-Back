/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { SendEmailDto } from './dto/sendEmailUser.dto';
import { sendEmail } from '../../services/email/email.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsersRepository(page: number, limit: number) {
    const start = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: start,
    });
    return users.map(
      ({ password, isAdmin, ...userNoPassword }) => userNoPassword,
    );
  }

  async getUserByEmailRepository(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el email ${email}`,
      );
    const { ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByIdRepository(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`No se encontro el usuario con el id ${id}`);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUserRepository(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUserRepository(id: string, user: Partial<Users>) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async removeUserRepository(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.delete(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async unsubscribeUserRepository(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(
        `Usuario con el email ${email} no encontrado`,
      );
    user.endDate = '00:00:00'; // CORREGIR
    await this.usersRepository.save(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  notifyUser = async (sendEmailDto: SendEmailDto) => {
    let { to, subject, text, html } = sendEmailDto;
    try {
      to = 'user@example.com';
      subject = 'Welcome!';
      text = 'Welcome to our service!';
      html = '<b>Welcome to our service!</b>';

      await sendEmail(to, subject, text, html);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
}
