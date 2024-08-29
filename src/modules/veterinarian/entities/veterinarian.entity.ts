import { User } from 'src/modules/users/entities/user.entity';
import { CategoryService } from '../../categoryServices/entities/categoryService.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany,OneToOne,PrimaryGeneratedColumn} from 'typeorm';
import { Service } from 'src/modules/services/entities/service.entity';
  
  @Entity({name: 'veterinarians'})
  export class Veterinarian {
    @PrimaryGeneratedColumn('uuid')
    id: string 
  
    @Column({type: 'int', nullable:false})
    licence: number;

    @Column({type: 'varchar',length: 50, nullable:false})
    specialty: string;

    @Column({type: 'varchar'})
    description: string;
  
    /* RELACION UNO-A-UNO CON User */
    @OneToOne(() => User, (user) => user.veterinarian)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({type: 'uuid',nullable: true})
    userId: string;

    /* RELACION UNO-A-MUCHOS CON service */
    @OneToMany(() => Service, (service) => service.veterinarian)
    services: Service[];
  }
  
