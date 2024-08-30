import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { StatesAppointment } from './entities/statesAppointment.entity';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly statesAppointmentRepository: Repository<StatesAppointment>,
    private readonly userRepository: UsersRepository,
  ) {}

  async getAppointments() {
    //await this.appointmentRepository.find({ relations: { pet: true, service: true, state: true } });
    await this.appointmentRepository.find({ relations: { pet: true, state: true } });
  }

  async getAppointmentById(idAppointment: string) {
    const appointment = await this.appointmentRepository.findOneBy({ id: idAppointment });

    if (!appointment) throw new NotFoundException('Turno no encontrado');
    return appointment;
  }

  async getAppointmentsByUserId(user: Omit<User, 'password'>) {
    const pets = user.pets;
    const appointments = this.appointmentRepository.find({
      where: { pet: In(pets.map((pet) => pet.id)) }, // Usa el operador In para filtrar por múltiples IDs de mascotas
      relations: {
        pet: true,
        //service: true,
        state: true,
      },
    });

    return appointments;
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto, idPet: string) {
    if (idPet) {
      const newAppointment = this.appointmentRepository.create(createAppointmentDto);
      await this.appointmentRepository.save(newAppointment);
    }
    return 'Turno creado';
  }

  async editAppointment(editAppointmentDto: EditAppointmentDto, idPet: string) {
    if (idPet) {
      await this.appointmentRepository.update(idPet, editAppointmentDto);
    }
    return 'Turno editado';
  }

  async cancelAppointment(idAppointment: string) {
    const appointment = await this.getAppointmentById(idAppointment);
    const canceledState = await this.statesAppointmentRepository.findOne({ where: { state: 'Cancelado' } });

    if (appointment.state === canceledState) throw new BadRequestException('El turno ya está cancleado');
    await this.appointmentRepository.update(idAppointment, { state: canceledState });
    return 'Turno cancelado existosamente';
  }
}
