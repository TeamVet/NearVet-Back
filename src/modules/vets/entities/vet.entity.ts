import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'vets',
})
export class Vet {
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
    nameCompany: string;

    @Column({
        type: 'bigint',
        nullable: false,
        unique: true,
    })
    cuit: number;

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

    @Column({
        type: 'date',
        nullable: false,
        default: () => 'CURRENT_DATE',
    })
    startDate: Date;
    

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgProfile: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgBanner: string;

    // RELACION MUCHOS-A-UNO CON users
    @ManyToOne(() => User, (user) => user.vet)
    user: User; 
}
