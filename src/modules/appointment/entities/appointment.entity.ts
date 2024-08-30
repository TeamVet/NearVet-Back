import { Pet } from 'src/modules/pets/entities/pet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatesAppointment } from './statesAppointment.entity';
import { Service } from 'src/modules/services/entities/service.entity';

@Entity({
  name: 'appointments',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'date' })
  time: Date;

  @Column({ type: 'varchar' })
  messageUser: string;

  @Column({ type: 'number' })
  price: number;

  /* RELACION MUCHOS-A-UNO CON mascotas */
  @ManyToOne(() => Pet, (pet) => pet.id)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  /* RELACION MUCHOS-A-UNO CON estado de turnos */
  @ManyToOne(() => StatesAppointment, (stateName) => stateName.state)
  @JoinColumn({ name: 'stateAppointment_id' })
  state: StatesAppointment;

  /* RELACION MUCHOS-A-UNO CON services */
  @ManyToOne(() => Service, (service) => service.id)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
