import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationProduct } from 'src/modules/applicationProduct/entities/applicationProduct.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { TypeService } from 'src/modules/typeService/entities/typeService.entity';
import { ClinicalExamination } from 'src/modules/clinical-examination/entities/clinicalExamination.entity';

@Entity({
  name: 'treatments',
})
export class Treatment {
  
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;
 
  // RELACION UNO-A-MUCHOS con applicationProduct
  @OneToMany(() => ApplicationProduct, (applicationProduct) => applicationProduct.treatment)
  applicationProducts: ApplicationProduct[];

  // RELACION UNO-A-MUCHOS con Service
  @ManyToOne(() => Service, (service) => service.treatments)
  @JoinColumn({name:"serviceId"}) 
  service: Service;
  @Column("uuid")
  serviceId:string

  // RELACION UNO-A-MUCHOS con clinicalExaminationId
  @ManyToOne(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.treatments)
  @JoinColumn({name:"clinicalExaminationId"}) 
  clinicalExamination: ClinicalExamination;
  @Column("uuid")
  clinicalExaminationId:string

  // RELACION UNO-A-MUCHOS con TypeService
  @ManyToOne(() => TypeService, (typeService) => typeService.treatments)
  @JoinColumn({name:"typeServiceId"}) 
  typeService: TypeService;
  @Column("uuid")
  typeServiceId:string

}
