import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsRepository } from './pets.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class PetsService {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPetsService() {
    return this.petsRepository.getPetsRepository();
  }

  async getPetByIdService(id: string) {
    return this.petsRepository.getPetByIdRepository(id);
  }

  async getPetsByUserService(id: string) {
    return this.petsRepository.getPetsByUserRepository(id);
  }

  async createPetService(createPetDto: CreatePetDto) {
    return this.petsRepository.createPetRepository(createPetDto);
  }

  async updatePetService(id: string, updatePetDto: UpdatePetDto) {
    return this.petsRepository.updatePetRepository(id, updatePetDto);
  }

  async removePetService(id: string) {
    return this.petsRepository.removePetRepository(id);
  }
}
