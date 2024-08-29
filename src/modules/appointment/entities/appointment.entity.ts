import { Pet } from "src/modules/pets/entities/pet.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'appointments',
})
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date',
        nullable: false,
    })
    date: Date;

    @Column({
        type: 'date',
        nullable: false,
    })
    time: Date;

    @Column({
        type: 'text',
        nullable: true,
    })
    messageUser: string;

    @Column({
        nullable: false,
        unique: true,
    })
    price: number;

    // RELACION MUCHOS-A-UNO con services

    // RELACION MUCHOS-A-UNO con statesAppointment

    // RELACION MUCHOS-A-UNO con pets
    @ManyToOne(() => Pet, (pet) => pet.appointments)
    pet: Pet; 
    
}
