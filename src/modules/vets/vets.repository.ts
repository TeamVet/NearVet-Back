import { Injectable } from "@nestjs/common";

@Injectable()
export class VetsRepository {
    constructor(
        private readonly vetsRepository
    ) {}

    async getAllVeterinariesRepository(){
       // logica con la base de datos
    }

    async getVeterinaryByIdRepository(){
        // logica con la base de datos
    }

    async createVeterinaryRepository(){
        // logica con la base de datos
    }

    async updateVeterinaryRepository(){
        // logica con la base de datos
    }

    async removeVeterinaryRepository(){
        // logica con la base de datos
    }
}