import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from '../pets/pets.module';
import { UsersModule } from '../users/users.module';
import { StatesAppointment } from './entities/statesAppointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, StatesAppointment]), // Registra la entidad Appointment
    PetsModule, // Importa PetsModule para que PetsRepository esté disponible
    UsersModule, // Importa UsersModule para que UsersService esté disponible
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}
