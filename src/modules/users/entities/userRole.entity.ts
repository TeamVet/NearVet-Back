import { User } from './user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'roles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false })
  role: string;

  @OneToMany(() => User, (user) => user.userRole)
  users: User[];
}
