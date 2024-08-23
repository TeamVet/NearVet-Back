import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
//import { UserRole } from './entities/userRole.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User /*, UserRole */])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository],
})
export class AuthGlobalModule {}
