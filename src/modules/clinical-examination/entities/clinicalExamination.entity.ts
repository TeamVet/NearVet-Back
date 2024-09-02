import { Pet } from "src/modules/pets/entities/pet.entity";
import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Veterinarian } from "src/modules/veterinarian/entities/veterinarian.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'clinicalExaminations',
  }) 
export class ClinicalExamination {

    @PrimaryGeneratedColumn("uuid")
    id:string;
 
    @Column({type:"text", nullable:false})
    anamnesis: string
    
    @OneToMany(() => Treatment, (treatment) => treatment.clinicalExamination)
    treatments: Treatment[];

    @ManyToOne (() => Pet, (pet) => pet.clinicalExaminations)
    @JoinColumn({name: "petId"})
    pet: Pet;
    @Column("uuid")
    petId:string

    @ManyToOne (() => Veterinarian, (veterinarian) => veterinarian.clinicalExaminations)
    @JoinColumn({name: "veterinarianId"})
    veterinarian: Veterinarian;
    @Column("uuid")
    veterinarianId:string
}
