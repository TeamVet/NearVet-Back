import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specie } from './specie.entity';
import { Race } from './race.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Sex } from './sex.entity';

@Entity({
  name: 'pets',
})
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  birthdate: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  startDate: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  endDate: string;

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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  emailOwner: string;

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
}
