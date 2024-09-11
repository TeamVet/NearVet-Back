import { Pet } from "src/modules/pets/entities/pet.entity";
import { Prescription } from "src/modules/prescription/entities/prescription.entity";
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

    @Column({nullable:true})
    fc: number

    @Column({nullable:true})
    fr: number

    @Column({type:"varchar", length:30, nullable:true})
    mucous: string

    @Column({nullable:true})
    tllc: number

    @Column({nullable:true})
    temperature: number

    @Column({nullable:true})
    hydration: number

    @Column({type:"varchar", length:50, nullable:false})
    moodState: string

    @Column({type:"varchar", length:50, nullable:false})
    temper: string

    @Column({type:"varchar", length:150, nullable:false})
    diagnostico: string
    
    @OneToMany(() => Treatment, (treatment) => treatment.clinicalExamination, { cascade: true })
    treatments: Treatment[];
    
    @OneToMany(() => Prescription, (prescription) => prescription.clinicalExamination, { cascade: true })
    prescriptions: Prescription[];

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
