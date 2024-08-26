import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity({
  name: 'repConritions',
})
export class RepCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  repCondition: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.repCondition)
  pets: Pet[];
}
