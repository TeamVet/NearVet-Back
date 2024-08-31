import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { PetsRepository } from '../pets/pets.repository';
import { UsersService } from '../users/users.service';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly petsRepository: PetsRepository,
    private readonly userService: UsersService,
  ) {}

  async getAppointmentsService(page: number, limit: number): Promise<Appointment[]> {
    return this.appointmentRepository.getAppointments(page, limit);
  }

  async getAppointmentByIdService(idAppointment: string) {
    return this.appointmentRepository.getAppointmentById(idAppointment);
  }

  async getAppointmentsByUserIdService(idUser: string) {
    const user = await this.userService.getUsersByIdService(idUser);
    return this.appointmentRepository.getAppointmentsByUserId(user);
  }

  async createAppointmentService(createAppointmentDto: CreateAppointmentDto) {
    await this.petsRepository.getPetByIdRepository(createAppointmentDto.pet.id);
    return this.appointmentRepository.createAppointment(createAppointmentDto);
  }
  async editAppointmentService(editAppointment: EditAppointmentDto, idPet: string) {
    await this.petsRepository.getPetByIdRepository(idPet);
    return this.appointmentRepository.editAppointment(editAppointment, idPet);
  }

  async cancelAppointmentService(idAppointment: string) {
    await this.appointmentRepository.getAppointmentById(idAppointment);
    return this.appointmentRepository.cancelAppointment(idAppointment);
  }
}
