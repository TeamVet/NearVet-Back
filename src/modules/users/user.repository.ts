import { sendEmail } from '../../services/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SendEmailDto } from './dto/sendEmail-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  notifyUser = async (sendEmailDto: SendEmailDto) => {
    let { to, subject, text, html } = sendEmailDto;
    try {
      to = 'user@example.com';
      subject = 'Welcome!';
      text = 'Welcome to our service!';
      html = '<b>Welcome to our service!</b>';

      await sendEmail(to, subject, text, html);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
}
