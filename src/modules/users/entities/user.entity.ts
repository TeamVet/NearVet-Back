import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from './citie.entity';
import { Pets } from 'src/modules/pets/entities/pet.entity';

@Entity({
  name: 'USERS',
})
export class Users {
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
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  birthdate: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({
    type: 'int',
  })
  phone: number;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  /* RELACION MUCHOS-A-UNO CON cities */
  @ManyToOne(() => Cities, (city) => city.users)
  city: Cities;

  /* RELACION UNO-A-MUCHOS con pets */
  @OneToMany(() => Pets, (pet) => pet.user)
  pets: Pets[];

  /* 
  //RELACION UNO-A-MUCHOS con roles 
  @OneToMany(() => Roles, (pet) => pet.user)
  userRoles: Roles[];
  */
}
