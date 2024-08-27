import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specie } from './specie.entity';
import { Race } from './race.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Sex } from './sex.entity';
import { RepCondition } from './repCondition.entity';

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

  @Column({
    type: 'int',
    nullable: false,
  })
  dni: number;

  @Column({ type: 'varchar', nullable: true })
  observation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weightCurrent: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  emailOwner: string;

  @Column({
    default:
      'https://img.freepik.com/vector-gratis/ilustracion-silueta-perro-gato-diseno-plano_23-2150369464.jpg?size=338&ext=jpg&ga=GA1.1.933601817.1722556800&semt=ais_hybrid',
  })
  imgProfile: string;

  /* RELACION MUCHOS-A-UNO CON usuarios */
  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  /* RELACION MUCHOS-A-UNO CON especie */
  @ManyToOne(() => Specie, (specie) => specie.pets)
  specie: Specie;

  /* RELACION MUCHOS-A-UNO CON raza */
  @ManyToOne(() => Race, (race) => race.pets)
  race: Race;

  /* RELACION MUCHOS-A-UNO CON sexo */
  @ManyToOne(() => Sex, (sex) => sex.pets)
  sex: Sex;

  /* RELACION MUCHOS-A-UNO CON Condicion Reproductiva */
  @ManyToOne(() => RepCondition, (repCondition) => repCondition.pets)
  repCondition: RepCondition;
}
