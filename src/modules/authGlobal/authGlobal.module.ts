import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
//import { UserRole } from './entities/userRole.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users /*, UserRole */])],
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository],
})
export class AuthGlobalModule {}
