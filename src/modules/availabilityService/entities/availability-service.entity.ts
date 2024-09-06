import { Service } from 'src/modules/services/entities/service.entity';
import { Veterinarian } from 'src/modules/veterinarian/entities/veterinarian.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'availabilityServices',
})
export class AvailabilityService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  day: number;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  startHour1: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  endHour1: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  startHour2: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  endHour2: string;

  // RELACION MUCHOS-A-UNO con services
  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.availabilityServices)
  @JoinColumn({ name: 'veterinarianId' })
  veterinarian: Veterinarian;
  @Column('uuid')
  veterinarianId: string;
}
