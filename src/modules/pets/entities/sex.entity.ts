import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./pet.entity";
import { Races } from "./race.entity";


@Entity({
    name: 'SEXES',
})
export class Sexes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    sex: string;

    /* RELACION UNO-A-MUCHOS CON pets */
    @OneToMany(() => Pets, (pet) => pet.sex)
    pets: Pets[];
}