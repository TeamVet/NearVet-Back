import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/sendEmailUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sends Emails')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<string> {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
