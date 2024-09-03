import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from './pet.entity';
import { Specie } from 'src/modules/species/entities/specie.entity';

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

  /* RELACION MUCHOS-A-UNO CON species */
  @ManyToOne(() => Specie, (specie) => specie.races)
  specie: Specie;
}
