import { Sale } from "src/modules/sales/entities/sale.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"methodsPay"
})
export class MethodPay {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    // Relacion con Sales uno a muchos
    @OneToMany(() => Sale, (sale) => sale.methodPay)
    sales: Sale[];

}
