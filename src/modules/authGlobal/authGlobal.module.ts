import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailProvider } from '../email/email.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository, EmailProvider],
})
export class AuthGlobalModule {}
