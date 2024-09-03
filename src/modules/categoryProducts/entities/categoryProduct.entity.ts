import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity({
  name: 'categoryProducts',
})
export class CategoryProduct {
  
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({type:"varchar", nullable:false})
  category:string

  // RELACION MUNO-A-MUCHOS con product
  @OneToMany(() => Product, (product) => product.categoryProduct)
  products: Product[];

}
