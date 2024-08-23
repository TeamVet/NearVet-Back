import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./pet.entity";
import { Races } from "./race.entity";


@Entity({
    name: 'SPECIES',
})
export class Species {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    specie: string;

    /* RELACION UNO-A-MUCHOS CON pets */
    @OneToMany(() => Pets, (pet) => pet.specie)
    pets: Pets[];

    /* RELACION MUCHOS-A-UNO CON races */
    @ManyToOne(() => Races, (race) => race.specie)
    race: Races;
    
}