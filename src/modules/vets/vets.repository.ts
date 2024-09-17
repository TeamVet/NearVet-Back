import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Vet } from "./entities/vet.entity";
import { CreateVetDto } from "./dto/create-vet.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class VetsRepository {
    constructor(
        @InjectRepository(Vet) private readonly vetsRepository: Repository<Vet>
    ) {}

    async getAllVeterinariesRepository(){
        return await this.vetsRepository.find();
    }

    async getVeterinaryByIdRepository(id: string): Promise<Vet>{
        return await this.vetsRepository.findOne({ where: { id } });
    }

    async getVeterinaryLogo(): Promise<string>{
        return await this.vetsRepository.find()[0];
    }

    async createVeterinaryRepository(veterinary: CreateVetDto): Promise<Vet>{
        return await this.vetsRepository.save(veterinary);
    }

    async updateVeterinaryRepository(id: string, veterinary: Partial<Vet>): Promise<Vet> {
        await this.vetsRepository.update(id, veterinary);
        return this.getVeterinaryByIdRepository(id);
      }

    async removeVeterinaryRepository(id: string): Promise<void> {
        await this.vetsRepository.delete(id); 
    }
}