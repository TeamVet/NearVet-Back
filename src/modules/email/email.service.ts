import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { SendEmailDto } from './dto/sendEmailUser.dto';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) {}

  async sendEmail(sendEmailDto: SendEmailDto): Promise<string> {
    return await this.emailProvider.sendEmail(sendEmailDto);
  }
}
