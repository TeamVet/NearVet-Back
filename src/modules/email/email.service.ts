import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { SendEmailDto } from './dto/createEmail.dto';
import { User } from '../users/entities/user.entity';
import { notificationAppointmentEmail, welcomeCHATGPT } from './plantillas/plantillasHTML';
import { Appointment } from '../appointment/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vet } from '../vets/entities/vet.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider,
              @InjectRepository(Vet) private vetRepository: Repository<Vet>,
              @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
  ) {}

  async WelcomeEmail(userDB: User, password:string, byGoogle:boolean): Promise<string> {
    const vet: Vet[] = await this.vetRepository.find()
    const sendEmailWelcome: SendEmailDto = {
      to: userDB.email,
      subject: `¡Bienvenido ${userDB.name}! - ${vet[0].name}`,
      html: welcomeCHATGPT({nombre:userDB.name, email:userDB.email , passwordDefault:password, logo: vet[0].imgLogo, byGoogle}),
      };
    return this.emailProvider.sendEmail(sendEmailWelcome);
  }

  @Cron('0 0 8 * * *')  // Este cron ejecuta la tarea todos los días a las 08:00 AM
  async notificationPending() {
        // Consulto todas los pending activos.

        // si la fecha de hoy es una semana antes del endPending 
        //o 3 dias antes o un dia antes enviamos email

        // enviamos el email al cliente con una plantilla recordando que debe sacar un turno
        //para X mascota para X servicio.. con el mensaje de cuidado previo segun el servicio indicado
    }

    @Cron('0 1 8 * * *')  // Este cron ejecuta la tarea todos los días a las 08:00 AM
    async notificationAppointment() {
        // Consulto todas los turnos pendientes.
        const activeAppointment: Appointment[] = await this.appointmentRepository.find({
            where : {state: {state: "Pendiente"}},
            relations: {pet:{ user:true},
                        service:true}

        })
        // traigo info de la veterinaria
        const vet: Vet[] = await this.vetRepository.find()

        // si la fecha de hoy es 3 dias antes o un dia antes enviamos email
        activeAppointment.forEach ((appointment) => {
            if (((new Date().getDate()+3) == appointment.date.getDate()) || ((new Date().getDate()+1) == appointment.date.getDate())) {
                  const sendEmailWelcome: SendEmailDto = {
                    to: appointment.pet.user.email,
                    subject: `¡Hola ${appointment.pet.user.name}! - Tenes un Turno en ${vet[0].name}`,
                    //html: notificationAppointmentEmail(appointment, vet[0]),
                    };
                  this.emailProvider.sendEmail(sendEmailWelcome);
            }
        })
       

        // enviamos el email al cliente con una plantilla recordando que debe asistir al turno
        //para "X" mascota para "X" servicio. con el mensaje de cuidado previo segun el servicio indicado
    }

    @Cron('0 2 8 * * *')  // Este cron ejecuta la tarea todos los días a las 08:00 AM
    async notificationVeterinarian() {
        // Consulto todas los turnos pendientes para un veterinario agrupado por fechas

        // si la fecha de hoy es un dia antes de los turnos enviamos email

        // enviamos el email al veterinario con una plantilla recordandole todos los turnos que tiene
        //con una lista de los horarios, las mascotas, y el servicio puentual. 
    }
}
