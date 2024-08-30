import { Injectable } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { VetsRepository } from './vets.repository';

@Injectable()
export class VetsService {

  constructor(
    private readonly vetsRepository: VetsRepository
  ) {}

  getAllVeterinaryService() {
    return this.vetsRepository.getAllVeterinariesRepository();
  }

  getVeterinaryByIdService(id: string) {
    return this.vetsRepository.getVeterinaryByIdRepository();
  }

  createVeterinaryService(createVetDto: CreateVetDto) {
    return this.vetsRepository.createVeterinaryRepository();
  }

  updateVeterinaryService(id: string, updateVetDto: UpdateVetDto) {
    return this.vetsRepository.updateVeterinaryRepository();
  }

  removeVeterinaryService(id: string) {
    return this.vetsRepository.removeVeterinaryRepository();
  }
}
