import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { User } from '../users/entities/user.entity';
//import { UserRole } from './entities/userRole.entity';
=======
import { Users } from '../users/entities/user.entity';
>>>>>>> b19fde0ee26600f76f48c5fac027cd63bac96a70
import { UsersRepository } from '../users/users.repository';
import { EmailProvider } from '../email/email.provider';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([User /*, UserRole */])],
=======
  imports: [TypeOrmModule.forFeature([Users])],
>>>>>>> b19fde0ee26600f76f48c5fac027cd63bac96a70
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService, UsersRepository, EmailProvider],
})
export class AuthGlobalModule {}
