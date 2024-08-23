import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import { UserRepository } from './user.repository';
import { EmailProvider } from '../email/email.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserRole])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UserRepository, EmailProvider],
})
export class AuthGlobalModule {}
