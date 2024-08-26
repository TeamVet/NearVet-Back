import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from 'src/modules/pets/entities/pet.entity';
import { UserRole } from './userRole.entity';

@Entity({
  name: 'users',
})
export class User {
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
    nullable: true,
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
    nullable: false,
  })
  birthDate: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  startDate: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  endDate: string;

  @Column({
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  city: string;

  @Column({ type: 'text', nullable: true })
  imgProfile: string;

  /* RELACION UNO-A-MUCHOS con pets */
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  //RELACION UNO-A-MUCHOS con roles
  @ManyToOne(() => UserRole, (role) => role.users)
  @JoinColumn()
  role: UserRole;
}
