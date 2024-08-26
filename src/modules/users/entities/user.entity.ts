import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from 'src/modules/pets/entities/pet.entity';
import { UserRole } from './userRole.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty()
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  dni: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  @ApiProperty()
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @ApiProperty()
  birthdate: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  @ApiProperty()
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  @ApiProperty()
  endDate: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  phone: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty()
  address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty()
  city: string;

  /* RELACION UNO-A-MUCHOS con pets */
  @ApiProperty()
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  //RELACION UNO-A-MUCHOS con roles
  @ApiProperty()
  @ManyToOne(() => UserRole, (role) => role.users)
  userRole: UserRole;
}
