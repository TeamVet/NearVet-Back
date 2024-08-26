import { Column, Entity, EntitySchema, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({type: 'varchar', length: 50, nullable: false}) 
  name: string;

  @Column({type: 'date', nullable: true}) 
  birthdate: Date;

  @Column({ type: 'date', nullable: false}) 
  startDate: Date;

  @Column({type: 'date',nullable: true})
  endDate: Date;

  @Column({type: 'varchar', length: 10, nullable: false})
  color: string;

  @Column({type: 'varchar', nullable: true})
  observation: string;

  @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
  weightCurrent: Number;

  @Column({type: 'varchar', nullable: false,
    default: `https://us.123rf.com/450wm/findriyani/findriyani2301/findriyani230100821/197733705-ilustraci%C3%B3n-de-vector-de-logotipo-de-silueta-de-tienda-de-mascotas.jpg?ver=6`,
  })
  image: string;

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
