import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto, EditAppointmentDto } from './dto/appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { StatesAppointment } from './entities/statesAppointment.entity';
import { PetsRepository } from '../pets/pets.repository';
import { ServiceRepository } from '../services/service.repository';
import { Between, Repository } from 'typeorm';

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
    return this.appointmentRepository.find({ take: limit, skip: (page - 1) * limit, relations: { pet: true, state: true } });
  }

  async getAppointmentById(idAppointment: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: idAppointment },
      relations: { pet: {race:true, specie:true, sex:true, repCondition:true}, state: true, service: true },
    });

    if (!appointment) throw new NotFoundException('Turno no encontrado');
    return appointment;
  }

  async getAppointmentsByVeterinarianAndDate (userId:string, startDate: Date, endDate: Date): Promise<Appointment[]> {

       return await this.appointmentRepository.find({
        select: {id:true, messageUser:true, time:true, date:true ,service: {service:true, durationMin:true}, pet: {name:true, user: {name:true, lastName:true,}}},
         where: {service: {veterinarian: {userId}}, date: Between(startDate, endDate), state: {state:"Pendiente"}},
         relations: {service: true , pet: {user:true}, state:true}
       })
     }
  
  async getAppointmentsByAdminAndDate(startDate: Date, endDate: Date) {
    return await this.appointmentRepository.find({
      select: {id:true, messageUser:true, time:true, date:true ,service: {service:true, durationMin:true}, pet: {name:true, user: {name:true, lastName:true,}}},
       where: {date: Between(startDate, endDate), state: {state:"Pendiente"}},
       relations: {service: true , pet: {user:true}, state:true}
     })
  }

  async getAppointmentsByUserId(userId: string) {
    //const pets = user.pets;
    const appointments = await this.appointmentRepository.find({
      where: { pet: { userId } }, // Usa el operador In para filtrar por múltiples IDs de mascotas
      relations: {
        pet: true,
        service: true,
        state: true,
      },
    });
    return appointments;
  }

  async getAppointmentsActive(): Promise<Appointment[]> {

    const appointments = await this.appointmentRepository.find({
      where: { state: {state:"Pendiente"} 
       }, // Usa el operador In para filtrar por múltiples IDs de mascotas
      relations: {
        pet: true,
        service: true,
        state: true,
      },
    });
    return appointments;
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const pet = await this.petsRepository.getPetByIdRepository(String(createAppointmentDto.pet_id));
    const state = await this.statesAppointmentRepository.findOne({
      where: { state: 'Pendiente' },
    });
    const service = await this.serviceRepository.getServiceById(String(createAppointmentDto.service_id));

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

  async finishAppointment(idAppoinment: string) {
    const finishService = await this.statesAppointmentRepository.findOne({ where: { state: 'Finalizado' } });
    await this.appointmentRepository.update(idAppoinment, {
      state: finishService,
    });
    return 'Turno finalizado';
  }

  async cancelAppointment(idAppointment: string) {
    const appointment = await this.getAppointmentById(idAppointment);
    const canceledState = await this.statesAppointmentRepository.findOne({ where: { state: 'Cancelado' } });

    if (appointment.state === canceledState) throw new BadRequestException('El turno ya está cancleado');
    await this.appointmentRepository.update(idAppointment, { state: canceledState });
    return { status: 200, message: 'Turno cancelado existosamente' };
  }
}
