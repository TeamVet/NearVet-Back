import { MethodPay } from "src/modules/method-pay/entities/method-pay.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"sales"
})
export class Sale {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default:0})
    subtotal: number

    @Column({default:0})
    discount: number

    @Column({default:0})
    total: number

    @Column({type:"date"})
    date: Date

    @Column({default:0})
    advancedPay: number

    @Column({default:false})
    finished: boolean

    @Column({default:false})
    sendClinical: boolean

    //Realcion con User Muchos a uno
    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn({name: "userId"})
    user: User;
    @Column("uuid")
    userId: string

    //Relacion con MethodPay 
    @ManyToOne(() => MethodPay, (methodPay) => methodPay.sales)
    @JoinColumn({name: "methodPayId"})
    methodPay: MethodPay;
    @Column("uuid")
    methodPayId: string

}
