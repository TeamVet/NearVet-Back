import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { sendEmail } from '../../services/email/email.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, sendEmail],
})
export class UsersModule {}
