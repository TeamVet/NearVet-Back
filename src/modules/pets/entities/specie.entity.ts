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
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  specie: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];

  /* RELACION MUCHOS-A-UNO CON races */
  @ManyToOne(() => Race, (race) => race.specie)
  race: Race;
}
