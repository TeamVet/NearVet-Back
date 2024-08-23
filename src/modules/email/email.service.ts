import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/createEmail.dto';
import { EmailProvider } from './email.provider';

@Injectable()
export class EmailService {

  constructor (private readonly emailProvider: EmailProvider){}
  
  async sendEmail(createEmailDto: CreateEmailDto) {
    return await this.emailProvider.sendEmail(createEmailDto);
  }

}
