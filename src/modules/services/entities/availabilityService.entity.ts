import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity({
  name: 'availabilty_services',
})
export class AvailabilityService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'number' })
  dia: number;

  @Column({ type: 'datetime' })
  startHour: Date;

  @Column({ type: 'datetime' })
  endHour: Date;

  @Column({ type: 'datetime' })
  startHour2: Date;

  @Column({ type: 'datetime' })
  endHour2: Date;

  /* RELACION MUCHOS-A-UNO CON services */
  @ManyToOne(() => Service, (service) => service.id)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
