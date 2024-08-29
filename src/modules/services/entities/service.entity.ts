import { AvailabilityService } from "src/modules/availabilityService/entities/availability-service.entity";
import { Veterinarian } from "src/modules/veterinarian/entities/veterinarian.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'services',
})
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    service: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    sendMessage: string;

    @Column({
        nullable: false,
        unique: true,
    })
    price: number;

    @Column({
        nullable: false,
        unique: true,
    })
    durationMin: number;

   // RELACION UNO-A-MUCHOS con AvailabilityServices
   @OneToMany(() => AvailabilityService, (availabilityService) => availabilityService.service)
   availabilityService: AvailabilityService[];

   // RELACION MUCHOS-A-UNO con veterinarians
   @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.service)
   veterinarian: Veterinarian;
    
}
