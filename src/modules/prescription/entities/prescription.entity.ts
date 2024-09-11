import { ClinicalExamination } from "src/modules/clinical-examination/entities/clinicalExamination.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'prescriptions',
  })
  export class Prescription {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;
  
    /* RELACION MUCHOS-A-UNO CON usuarios */
    @ManyToOne(() => Product, (product) => product.prescriptions)
    @JoinColumn({name:"productId"})
    product: Product;
    @Column({nullable:true})
    productId: string;
  
    /* RELACION MUCHOS-A-UNO CON usuarios */
    @ManyToOne(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.prescriptions)
    @JoinColumn({name:"clinicalExaminationId"})
    clinicalExamination: ClinicalExamination;
    @Column({type: "uuid", nullable:true})
    clinicalExaminationId: string;
  }
  