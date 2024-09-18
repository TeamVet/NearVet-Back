import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { VetsRepository } from './vets.repository';

@Injectable()
export class VetsService {

  constructor(
    private readonly vetsRepository: VetsRepository
  ) {}

  async getAllVeterinaryService() {
    const vets = await this.vetsRepository.getAllVeterinariesRepository();
    return vets;
  }

  async getVeterinaryByIdService(id: string) {
    const vet = await this.vetsRepository.getVeterinaryByIdRepository(id);
    if (!vet) throw new NotFoundException(`No se encontró la veterinaria con ID ${id}`);
    return vet 
  }

  async getVeterinaryLogo(): Promise<string> {
    return await this.vetsRepository.getVeterinaryLogo();
  }

  async createVeterinaryService(createVetDto: CreateVetDto) {
    return await this.vetsRepository.createVeterinaryRepository(createVetDto);
  }

  async updateVeterinaryService(id: string, updateVetDto: UpdateVetDto) {
    const vet = await this.getVeterinaryByIdService(id);
    if (!vet) {
      throw new NotFoundException(`No se encontró la veterinaria con ID ${id}`);
    }
    await this.vetsRepository.updateVeterinaryRepository(id, updateVetDto);
    return id;
  }

  async removeVeterinaryService(id: string) {
    const vet = await this.getVeterinaryByIdService(id);
    if (!vet) {
      throw new NotFoundException(`No se encontró la veterinaria con ID ${id}`);
    }

    await this.vetsRepository.removeVeterinaryRepository(id);
    return { message: `Veterinaria con ID ${id} eliminada exitosamente` };
  }
}
