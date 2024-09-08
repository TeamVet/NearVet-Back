import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailProvider } from './email.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Vet } from '../vets/entities/vet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Vet])],
  controllers: [EmailController],
  providers: [EmailService, EmailProvider],
})
export class EmailModule {}
