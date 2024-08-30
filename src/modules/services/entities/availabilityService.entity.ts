import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity({
  name: 'availabilty_services',
})
export class AvailabilityService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  dia: number;

  @Column({ type: 'date' })
  startHour: Date;

  @Column({ type: 'date' })
  endHour: Date;

  @Column({ type: 'date' })
  startHour2: Date;

  @Column({ type: 'date' })
  endHour2: Date;

  /* RELACION MUCHOS-A-UNO CON services 
  @ManyToOne(() => Service, (service) => service.id) //CAMBIAR LUEGO DE TENER LA ENTIDAD Service
  @JoinColumn({ name: 'service_id' })
  service: Service;
  */
}
