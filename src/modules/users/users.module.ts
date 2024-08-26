import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//import { sendEmail } from '../../services/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CloudinaryService],
  exports: [UsersRepository],
})
export class UsersModule {}
