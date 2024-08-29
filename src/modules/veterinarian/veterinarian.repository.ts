import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Veterinarian } from "./entities/veterinarian.entity";
import { Repository } from "typeorm";

@Injectable()
export class VeterinarianRepository {
    
    constructor ( 
        @InjectRepository(Veterinarian) private readonly veterinarianRepository: Repository<Veterinarian>
    ) {}

    async getVeterinarianByLicence(licence: number): Promise<Veterinarian> {
        return await this.veterinarianRepository.findOne({where: {licence}})
      }

    async createVeterinarian(vet: Partial<Veterinarian>): Promise<Veterinarian> {
        return await this.veterinarianRepository.save(vet);
      }

}