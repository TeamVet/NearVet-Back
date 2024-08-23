import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./pet.entity";
import { Species } from "./specie.entity";


@Entity({
    name: 'RACES',
})
export class Races {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    race: string;

    /* RELACION UNO-A-MUCHOS CON pets */
    @OneToMany(() => Pets, (pet) => pet.specie)
    pets: Pets[];

    /* RELACION UNO-A-MUCHOS CON species */
    @OneToMany(() => Species, (specie) => specie.race)
    specie: Species[];
    
}