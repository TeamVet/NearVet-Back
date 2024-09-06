import { Service } from "src/modules/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'availabilityServices',
})
export class AvailabilityService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  day: number;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  startHour1: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  endHour1: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  startHour2: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  endHour2: string;

   // RELACION MUCHOS-A-UNO con services
   @ManyToOne(() => Service, (service) => service.availabilityService)
   @JoinColumn({name:"serviceId"})
   service: Service; 
   @Column("uuid")
   serviceId:string
    
}
