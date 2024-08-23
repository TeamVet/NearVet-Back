import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailProvider } from './email.provider';

@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailProvider],
})
export class EmailModule {}
