/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SendEmailDto } from './dto/sendEmailUser.dto';
import { sendEmail } from '../../services/email/email.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsersRepository(page: number, limit: number) {
    return await this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getUserByEmailRepository(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async getUserByDNIRepository(DNI: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { DNI },
    });
  }

  async getUserByIdRepository(id: string) {
    return await this.usersRepository.findOne({ 
      where: { id },
      relations: {userRole:true}
    });
  }

  async createUserRepository(
    user: Partial<User>,
  ): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async updateUserRepository(id: string, user: Partial<User>) {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOneBy({ id });
  }

  async removeUserRepository(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(user);
    return user;
  }

  async unsubscribeUserRepository(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.save(user);
    return user;
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
