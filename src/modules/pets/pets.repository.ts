import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
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
    private usersRepository: UsersRepository,
  ) {}

  async getPetsSexService(): Promise<Sex[]> {
    return await this.sexRepository.find();
  }
  async getPetSpeciesandRacesRepository(): Promise <Specie[]> {
    return await this.specieRepository.find({relations: {races:true}});
  }

  async getPetsRepository() {
    const pets = await this.petsRepository.find({relations: {race:true, specie:true, sex:true}});
    if (pets.length === 0)
      throw new NotFoundException(`Por el momento no hay mascotas registradas`);
    return pets;
  }

  async getPetByIdRepository(id: string) {
    const pet = await this.petsRepository.findOne({ 
      where: {id},
      relations: {specie: true, race: true, sex:true}});
    if (!pet)
      throw new NotFoundException(`Mascota con el ID ${id} no encontrada`);
    return pet;
  }

  async getPetsByUserRepository(id: string) {
    const user = await this.usersRepository.getUserByIdRepository(id);
    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el id ${id} para obtener sus mascotas`,
      );
    return {
      id,
      pets: user.pets,
    };
  }

  async createPetRepository(pet: CreatePetDto) {
    const { userId, sexId, specieId, raceId } = pet;

    const user: User = await this.usersRepository.getUserByIdRepository(userId);
    if (!user) {throw new NotFoundException(`No se encontro el usuario con el id ${userId} para registrar su mascota`);}

    const sex: Sex = await this.sexRepository.findOneBy({id: sexId});
    if (!sex) {throw new NotFoundException(`No se encontro el sexo con el id ${sexId} para registrar su mascota`);}
      
    const specie: Specie = await this.specieRepository.findOneBy({id: specieId});
    if (!specie) throw new NotFoundException( `No se encontro la especie con el id ${specieId} para registrar su mascota` );
    
    const race: Race = await this.raceRepository.findOneBy({id: raceId});
    if (!race) {throw new NotFoundException(`No se encontro el sexo con el id ${raceId} para registrar su mascota`);}

    const newPet = this.petsRepository.create({
      ...pet,
      user,
      sex,
      specie,
      race,
    });
    const savedPet = await this.petsRepository.save(newPet);
    savedPet.user.password = 'oculto';
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
