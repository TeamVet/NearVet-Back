import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from './pet.entity';
import { Specie } from './specie.entity';

@Entity({
  name: 'races',
})
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  race: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];

  /* RELACION UNO-A-MUCHOS CON species */
  @OneToMany(() => Specie, (specie) => specie.race)
  specie: Specie[];
}
