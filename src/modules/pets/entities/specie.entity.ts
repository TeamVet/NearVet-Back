import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { Race } from './race.entity';

@Entity({
  name: 'species',
})
export class Specie {
  @PrimaryGeneratedColumn('uuid')
  id: string 

  @Column({
    type: 'varchar',
    length: 50,
  })
  specie: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];

  /* RELACION UNO-A-MUCHOS CON race */
  @OneToMany(() => Race, (race) => race.specie)
  races: Race[];
}
