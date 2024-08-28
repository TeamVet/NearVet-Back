import { Service } from "src/modules/services/entities/service.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'veterinarians',
})
export class Veterinarian {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    license: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgLicense: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    // RELACION UNO-A-MUCHOS CON users
    @OneToMany(() => User, (user) => user.veterinarian)
    user: User[]; 

    // RELACION UNO-A-MUCHOS con service
    @OneToMany(() => Service, (service) => service.veterinarian)
    service: Service[]; 
}
