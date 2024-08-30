import { Veterinarian } from 'src/modules/veterinarian/entities/veterinarian.entity';
import { CategoryService } from '../../categoryServices/entities/categoryService.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import { AvailabilityService } from '../../availabilityService/entities/availability-service.entity';
  
  @Entity({name: 'services'})
  export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string 
  
    @Column({type: 'varchar',length: 50, nullable:false})
    service: string;

    @Column({type: 'varchar', nullable:false})
    description: string;

    @Column({type: 'varchar', nullable:true})
    sendMesasge: string;

    @Column()
    price: number;

    @Column()
    durationMin: number;

    /* RELACION UNO-A-MUCHOS CON Veterinarian */
    @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.services)
    @JoinColumn({ name: 'veterinarianId' })
    veterinarian: Veterinarian;
    @Column({type: 'uuid',nullable: true})
    veterinarianId: string;
  
    /* RELACION MUCHOS-A-UNO CON CategoryService */
    @ManyToOne(() => CategoryService, (categoryService) => categoryService.services)
    @JoinColumn({ name: 'categoryServiceId' })
    categoryService: CategoryService[];
    @Column({type: 'uuid',nullable: true})
    categoryServiceId: string;

    @OneToMany(() => AvailabilityService, (availabilityService) => availabilityService.service)
    availabilityService: AvailabilityService[];
  }
  
