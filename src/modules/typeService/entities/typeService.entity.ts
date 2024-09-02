import { Service } from "src/modules/services/entities/service.entity";
import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'typeServices',
  })
export class TypeService {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type:"varchar"})
    typeService:string

    @OneToMany(() => Treatment, (treatment) => treatment.typeService)
    treatments: Treatment[];

    @ManyToOne(() => Service, (service) => service.typeServices)
    @JoinColumn({name:"serviceId"})
    service: Service;
    @Column({type:"uuid", nullable:true})
    serviceId: string
}
