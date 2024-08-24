import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsRepository {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async getPetsRepository() {
    const pets = await this.petsRepository.find();
    if (pets.length === 0)
      throw new NotFoundException(`Por el momento no hay mascotas registradas`);
    return pets;
  }

  async getPetByIdRepository(id: string) {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet)
      throw new NotFoundException(`Mascota con el ID ${id} no encontrada`);
    return pet;
  }

  async createPetRepository(pet: Partial<Pet>) {
    const newPet = this.petsRepository.create(pet);
    return await this.petsRepository.save(newPet);
  }

  async updatePetRepository(id: string, petData: Partial<Pet>) {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet)
      throw new NotFoundException(
        `Mascota para modificar con el ID ${id} no encontrada`,
      );
    await this.petsRepository.update(id, petData);
    return await this.getPetByIdRepository(id);
  }

  async removePetRepository(id: string) {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet)
      throw new NotFoundException(
        `Mascota para eliminar con el ID ${id} no encontrada`,
      );
    const result = await this.petsRepository.delete(id);
    return result;
  }

  /*
    async getUserPetsByIdRepository(id: string){
        
    }
    */
}
