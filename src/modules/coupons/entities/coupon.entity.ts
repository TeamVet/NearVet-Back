import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coupons' })
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  code: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  porcentageValue: number;

  @Column({
    type: 'date',
  })
  expirationDate: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  // relacion muchos-a-uno con User
@ManyToOne(() => User, (user) => user.coupons)
@JoinColumn({name:"userId"})
user: User;
@Column("uuid")
userId:string

}
