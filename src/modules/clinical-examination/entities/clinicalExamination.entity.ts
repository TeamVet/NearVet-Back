import { Pet } from "src/modules/pets/entities/pet.entity";
import { Prescription } from "src/modules/prescription/entities/prescription.entity";
import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Veterinarian } from "src/modules/veterinarian/entities/veterinarian.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
  name: 'clinicalExaminations',
}) 
export class ClinicalExamination {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: 'ID único del examen clínico',
    type: String,
    format: 'uuid',
  })
  id: string;

  @Column({ type: "text", nullable: false })
  @ApiProperty({
    description: 'Anamnesis del examen clínico',
    type: String,
  })
  anamnesis: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Frecuencia cardíaca del paciente',
    type: Number,
    nullable: true,
  })
  fc: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Frecuencia respiratoria del paciente',
    type: Number,
    nullable: true,
  })
  fr: number;

  @Column({ type: "varchar", length: 30, nullable: true })
  @ApiProperty({
    description: 'Estado de las mucosas del paciente',
    type: String,
    maxLength: 30,
    nullable: true,
  })
  mucous: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Tiempo de llenado capilar (TLLC) del paciente',
    type: Number,
    nullable: true,
  })
  tllc: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Temperatura corporal del paciente',
    type: Number,
    nullable: true,
  })
  temperature: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Nivel de hidratación del paciente',
    type: Number,
    nullable: true,
  })
  hydration: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({
    description: 'Estado de ánimo del paciente',
    type: String,
    maxLength: 50,
  })
  moodState: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({
    description: 'Temperamento del paciente',
    type: String,
    maxLength: 50,
  })
  temper: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  @ApiProperty({
    description: 'Diagnóstico del examen clínico',
    type: String,
    maxLength: 150,
  })
  diagnostico: string;

  @OneToMany(() => Treatment, (treatment) => treatment.clinicalExamination, { cascade: true })
  @ApiProperty({
    description: 'Lista de tratamientos asociados al examen clínico',
    type: [Treatment],
  })
  treatments: Treatment[];

  @ManyToOne(() => Pet, (pet) => pet.clinicalExaminations)
  @JoinColumn({ name: "petId" })
  @ApiProperty({
    description: 'Mascota asociada al examen clínico',
    type: () => Pet,
  })
  pet: Pet;

  @Column("uuid")
  @ApiProperty({
    description: 'ID de la mascota asociada al examen clínico',
    type: String,
    format: 'uuid',
  })
  petId: string;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.clinicalExaminations)
  @JoinColumn({ name: "veterinarianId" })
  @ApiProperty({
    description: 'Veterinario que realizó el examen clínico',
    type: () => Veterinarian,
  })
  veterinarian: Veterinarian;

  @Column("uuid")
  @ApiProperty({
    description: 'ID del veterinario que realizó el examen clínico',
    type: String,
    format: 'uuid',
  })
  veterinarianId: string;

  @OneToMany(() => Prescription, (prescription) => prescription.clinicalExamination)
  @ApiProperty({
    description: 'Lista de prescripciones asociadas al examen clínico',
    type: [Prescription],
  })
  prescriptions: Prescription[];
}
