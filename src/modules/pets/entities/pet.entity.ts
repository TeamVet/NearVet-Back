import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Race } from './race.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Sex } from './sex.entity';
import { RepCondition } from './repCondition.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Specie } from 'src/modules/species/entities/specie.entity';

@Entity({
  name: 'pets',
})
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  color: string;

  @Column({ type: 'varchar', nullable: true })
  observation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weightCurrent: number;

  @Column({
    default:
      'https://img.freepik.com/vector-gratis/ilustracion-silueta-perro-gato-diseno-plano_23-2150369464.jpg?size=338&ext=jpg&ga=GA1.1.933601817.1722556800&semt=ais_hybrid',
  })
  imgProfile: string;

  /* RELACION MUCHOS-A-UNO CON usuarios */
  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({name:"userId"})
  user: User;
  @Column({nullable:true})
  userId: string;

  /* RELACION MUCHOS-A-UNO CON especie */
  @ManyToOne(() => Specie, (specie) => specie.pets)
  @JoinColumn({name:"specieId"})
  specie: Specie;
  @Column({nullable:true})
  specieId: string;

  /* RELACION MUCHOS-A-UNO CON raza */
  @ManyToOne(() => Race, (race) => race.pets)
  @JoinColumn({name:"raceId"})
  race: Race;
  @Column({nullable:true})
  raceId: string;

  /* RELACION MUCHOS-A-UNO CON sexo */
  @ManyToOne(() => Sex, (sex) => sex.pets)
  @JoinColumn({name:"sexId"})
  sex: Sex;
  @Column({nullable:true})
  sexId: string;

  /* RELACION MUCHOS-A-UNO CON Condicion Reproductiva */
  @ManyToOne(() => RepCondition, (repCondition) => repCondition.pets)
  @JoinColumn({name:"repConditionId"})
  repCondition: RepCondition;
  @Column({nullable:true})
  repConditionId: string;

  // RELACION UNO-A-MUCHOS con appointments
  @OneToMany(() => Appointment, (appointment) => appointment.pet)
  appointments: Appointment[];
}
