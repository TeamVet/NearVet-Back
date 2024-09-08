import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('pendings')
export class Pending {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  endPending: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  notification: boolean;

  /* RELACION MUCHOS-A-UNO CON services */
  @ManyToOne(() => Service, (service) => service.pendings)
  service: Service;

  /* RELACION MUCHOS-A-UNO CON pets */
  @ManyToOne(() => Pet, (pet) => pet.pendings)
  pet: Pet;

  @ManyToOne(() => User, (user) => user.pendings) 
  user: User; 
}
