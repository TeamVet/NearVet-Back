import { Injectable, NotFoundException } from '@nestjs/common';
import { AvailabilityServiceRepository } from './availabilityService.repository';
import { Hours, appoitmentGenerate } from 'src/helpers/appoitmentGenerate';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvailabilityServiceService {
  
constructor (private readonly availabilityRepository: AvailabilityServiceRepository,
             private readonly veterinarianRepository: VeterinarianRepository,
             @InjectRepository(Appointment)
             private readonly appointmentRepository: Repository<Appointment>,
){}

  
async getAvailability () {
  return await this.availabilityRepository.getAvailability();
}

async getAppointmentService(veterinarianId: string, date: Date) {
  
  //Obtengo la duracion de cada turno si no esta quiere decir que el veterinario no existe
  const serviceDuration = await this.veterinarianRepository.getVeterianrianDelayAtention(veterinarianId)
  if (!serviceDuration) throw new NotFoundException("El veterinario no existe");

  // obtengo los turnos disponibles del veterinario ese dia. Si no hay retorno error
  const availabilityService = await this.availabilityRepository.getAvailabilityAtention(veterinarianId, date.getDay())
  if (!availabilityService) throw new NotFoundException("Este veterinario no atiende en el dia solicitado");

  // Uso el Helper appoitmentGenerate para generar el array con los horarios totales disponibles
  let arrayAppointmentAvailabilties: Hours[] = appoitmentGenerate(availabilityService.startHour1, availabilityService.endHour1, serviceDuration.delayAtention);
  // si hay un segundo horario tambien lo sumo
  if (availabilityService.startHour2 && availabilityService.endHour2)
      arrayAppointmentAvailabilties = arrayAppointmentAvailabilties.concat(appoitmentGenerate(availabilityService.startHour2, availabilityService.endHour2, serviceDuration.delayAtention));
  
  // Obtengo todos los turnos ya ocupados
  const arrayAppointmentAnavailability = await this.appointmentRepository.find({
    where: {service: {veterinarianId}},
    select: ["id", "time"]
    })

  // Creo un array con los turnos libres a partir del total de turnos 
  // y los turnos ya ocupados y retorno el resultado
  const appointmentFree: Hours[] = arrayAppointmentAvailabilties.filter(disponible => 
       !arrayAppointmentAnavailability.some(ocupado => ocupado.time === disponible.hour)
     );
  return appointmentFree;
  }
  
  
}
