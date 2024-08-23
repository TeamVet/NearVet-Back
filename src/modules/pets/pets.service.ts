import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsRepository } from './pets.repository';

@Injectable()
export class PetsService {
  constructor(private readonly petsRepository: PetsRepository){}

  getPetsService() {
    return this.petsRepository.getPetsRepository();
  }

  getPetByIdService(id: string) {
    return this.petsRepository.getPetByIdRepository(id);
  }

  createPetService(createPetDto: CreatePetDto) {
    return this.petsRepository.createPetRepository(createPetDto);
  }

  updatePetService(id: string, updatePetDto: UpdatePetDto) {
    return this.petsRepository.updatePetRepository(id, updatePetDto);
  }

  removePetService(id: string) {
    return this.petsRepository.removePetRepository(id);
  }

  /*
  getUserPetsByIdService(id: number) {
    return this.petsRepository.getUserPetsByIdRepository();
  }
  */
}
