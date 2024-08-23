import { 
    Column, 
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
 } from "typeorm";
import { Species } from "./specie.entity";
import { Races } from "./race.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Sexes } from "./sex.entity";



@Entity({
    name: 'PETS',
})
export class Pets {
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
    birthdate: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    startDate: string;
    
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    endDate: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
    })
    color: string;


    /* RELACION MUCHOS-A-UNO CON usuarios */
    @ManyToOne(() => User, (user) => user.pets)
    user: User;

    /* RELACION MUCHOS-A-UNO CON especie */
    @ManyToOne(() => Species, (specie) => specie.pets)
    specie: Species;

    /* RELACION MUCHOS-A-UNO CON raza */
    @ManyToOne(() => Races, (race) => race.pets)
    race: Races;

    /* RELACION MUCHOS-A-UNO CON sexo */
    @ManyToOne(() => Sexes, (sex) => sex.pets)
    sex: Sexes;

}