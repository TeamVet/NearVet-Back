/* import { Users } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'roles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false })
  role: string;

  @ManyToMany(() => Users, (user) => user.userRoles)
  @JoinTable({
    name: 'userRoles',
    joinColumn: {
      name: 'userRoleid',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userid',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
 */
