import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailProvider } from '../email/email.provider';
import { UserRole } from '../users/entities/userRole.entity';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository, EmailProvider],
})
export class AuthGlobalModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes("authGlobal/auth0/signup")
  }
}
