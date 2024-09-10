import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { PetsRepository } from '../pets/pets.repository';
import { UsersService } from '../users/users.service';
import { Appointment } from './entities/appointment.entity';
import { AppResponseCalendarDayDto } from './dto/AppResponseCalendar.dto';

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

  async getAppointmentByIdService(idAppointment: string): Promise<Appointment> {
    return await this.appointmentRepository.getAppointmentById(idAppointment);
  }

   async getAppointmentsByVeterinarianAndDate (veterinarianId:string, date: Date): Promise<AppResponseCalendarDayDto[]> {
    const appointments: Appointment[] = await this.appointmentRepository.getAppointmentsByVeterinarianAndDate(veterinarianId, date);
     const responseAppointments: AppResponseCalendarDayDto[] = []
     if (appointments.length>0) {
       appointments.forEach ((appointment) => {
             let endHour: number = +(appointment.time.split(":")[0]);
             let endMin: number = +(appointment.time.split(":")[1]);
             const delayApp: number = appointment.service.durationMin;
             endMin += delayApp;
             if (endMin >= 60) {
               endHour += 1;
               endMin -= 60
             }
             const dateApp = new Date(appointment.date)
             const responseAppointment: AppResponseCalendarDayDto = {
               id: appointment.id,
               Subject: `${appointment.service.service} - ${appointment.pet.user.name} ${appointment.pet.user.lastName}`, //"Rayos X - Javier", servicio - nombre del cliente
               description: appointment.messageUser ? `Mascota: ${appointment.pet.name} - Observación: ${appointment.messageUser}` : `Mascota: ${appointment.pet.name} - Observación: Sin Observacíones`, //"Mascota: Firu - Observaciones: Sin observaciones", Pet - Observacion del Cliente
               StartTime: new Date(dateApp.getFullYear(), dateApp.getMonth(), dateApp.getDate(), +appointment.time.split(":")[0], +appointment.time.split(":")[1]), // new Date(2024, 8, 9, 9, 0), ///anio, -mes, dia, hora, minutos Horario de comienzo
               EndTime: new Date(dateApp.getFullYear(), dateApp.getMonth(), dateApp.getDate(), endHour, endMin), //new Date(2024, 8, 9, 10, 0), Horario fin
               isAllDay: false, //false, siempre en false
             }
             responseAppointments.push(responseAppointment);
       })  
     } 
     console.log("responseAppointments", responseAppointments)
     return responseAppointments;
   }

  async getAppointmentsByUserIdService(idUser: string) {
    return this.appointmentRepository.getAppointmentsByUserId(idUser);
  }

  async createAppointmentService(createAppointmentDto: CreateAppointmentDto) {
    await this.petsRepository.getPetByIdRepository(String(createAppointmentDto.pet_id));
    return this.appointmentRepository.createAppointment(createAppointmentDto);
  }

  async editAppointmentService(editAppointment: EditAppointmentDto, idAppointment: string) {
    const appointment = await this.getAppointmentByIdService(idAppointment);
    return this.appointmentRepository.editAppointment(editAppointment, appointment);
  }

  async finishAppointmentService(idAppointment: string) {
    await this.getAppointmentByIdService(idAppointment);
    return this.appointmentRepository.finishAppointment(idAppointment);
  }

  async cancelAppointmentService(idAppointment: string) {
    await this.appointmentRepository.getAppointmentById(idAppointment);
    return this.appointmentRepository.cancelAppointment(idAppointment);
  }
}
