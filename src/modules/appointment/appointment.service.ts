import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { PetsRepository } from '../pets/pets.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly petsRepository: PetsRepository,
    private readonly userService: UsersService,
  ) {}

  async getAppointmentsService() {
    return this.appointmentRepository.getAppointments();
  }

  async getAppointmentByIdService(idAppointment: string) {
    return this.appointmentRepository.getAppointmentById(idAppointment);
  }

  async getAppointmentsByUserIdService(idUser: string) {
    const user = await this.userService.getUsersByIdService(idUser);
    return this.appointmentRepository.getAppointmentsByUserId(user);
  }

  async createAppointmentService(createAppointmentDto: CreateAppointmentDto, idPet: string) {
    await this.petsRepository.getPetByIdRepository(idPet);
    return this.appointmentRepository.createAppointment(createAppointmentDto, idPet);
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
