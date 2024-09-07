import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'sale_services',
})
export class SaleService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;
}
