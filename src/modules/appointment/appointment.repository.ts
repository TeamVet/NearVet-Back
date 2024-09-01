import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { StatesAppointment } from './entities/statesAppointment.entity';
import { User } from '../users/entities/user.entity';
import { PetsRepository } from '../pets/pets.repository';
import { ServiceRepository } from '../services/service.repository';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(StatesAppointment)
    private readonly statesAppointmentRepository: Repository<StatesAppointment>,
    private readonly petsRepository: PetsRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async getAppointments(page: number, limit: number) {
    //await this.appointmentRepository.find({ relations: { pet: true, service: true, state: true } });
    return this.appointmentRepository.find({ take: limit, skip: (page - 1) * limit, relations: { pet: true, state: true } });
  }

  async getAppointmentById(idAppointment: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: idAppointment },
      relations: { pet: true, state: true, service: true },
    });

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

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const pet = await this.petsRepository.getPetByIdRepository(createAppointmentDto.pet_id.id);
    const state = await this.statesAppointmentRepository.findOne({
      where: { state: 'Pendiente' },
    });
    const service = await this.serviceRepository.getServiceById(createAppointmentDto.service_id.id);
    const newAppointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      state,
      pet,
      service,
    });
    await this.appointmentRepository.save(newAppointment);
    return newAppointment;
  }

  async editAppointment(editAppointmentDto: EditAppointmentDto, appointment: Appointment) {
    const service = await this.serviceRepository.getServiceById(String(editAppointmentDto.service));
    await this.appointmentRepository.update(appointment.id, {
      ...editAppointmentDto,
      service,
    });
    return appointment;
  }

  async cancelAppointment(idAppointment: string) {
    const appointment = await this.getAppointmentById(idAppointment);
    const canceledState = await this.statesAppointmentRepository.findOne({ where: { state: 'Cancelado' } });

    if (appointment.state === canceledState) throw new BadRequestException('El turno ya está cancleado');
    await this.appointmentRepository.update(idAppointment, { state: canceledState });
    return 'Turno cancelado existosamente';
  }
}
