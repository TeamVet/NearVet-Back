import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"fileTreatments"})
export class FileTreatment {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    image: string;

    @ManyToOne(() => Treatment, (treatment) => treatment.fileTreatments)
    @JoinColumn({name:"treatmentId"})
    treatment: Treatment;
    @Column("uuid")
    treatmentId:string
}
