import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../users/entities/user.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Sex } from './entities/sex.entity';
import { Specie } from './entities/specie.entity';
import { Race } from './entities/race.entity';

@Injectable()
export class PetsRepository {
  
  
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    @InjectRepository(Sex) private readonly sexRepository: Repository<Sex>,
    @InjectRepository(Specie) private readonly specieRepository: Repository<Specie>,
    @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
  ) {}

  async getPetsSexService(): Promise<Sex[]> {
    return await this.sexRepository.find();
  }
  async getPetSpeciesandRacesRepository(): Promise <Specie[]> {
    return await this.specieRepository.find({relations: {races:true}});
  }

  async getPetSpeciesRepository(): Promise<Specie[]> {
    return await this.specieRepository.find();
  }
  
  async getPetRacesRepository(specie: string): Promise<Race[]> {
      const specieDB: Specie = await this.specieRepository.findOne({
      where: {specie},
      relations: {races:true}
    })
    return specieDB.races;
  }

  async getPetsRepository(): Promise<Pet[]> {
    return  await this.petsRepository.find({relations: {race:true, specie:true, sex:true, repCondition:true}});
  }

  async getPetByIdRepository(id: string) {
    const pet = await this.petsRepository.findOne({ 
      where: {id},
      relations: {specie: true, race: true, sex:true}});
    if (!pet)
      throw new NotFoundException(`Mascota con el ID ${id} no encontrada`);
    return pet;
  }

  async getPetsByUserRepository(id: string): Promise<Pet[]> {
    const pets = await this.petsRepository.find({where: {userId: id}, relations: {sex:true, race:true, specie:true, repCondition:true}});
    return pets
  }

  async createPetRepository(pet: Partial<Pet>) {
  
    const newPet: Pet = this.petsRepository.create(pet);
    const savedPet = await this.petsRepository.save(newPet);
    return savedPet;
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
}
