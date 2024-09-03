import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Sex } from './entities/sex.entity';
import { Race } from './entities/race.entity';
import { Pet } from './entities/pet.entity';
import { Specie } from '../species/entities/specie.entity';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getPetsService(): Promise<Pet[]> {
    const pets: Pet[] = await this.petsRepository.getPetsRepository();
    if (pets.length === 0) throw new NotFoundException(`Por el momento no hay mascotas registradas`);
    return pets;
  }

  async getPetByIdService(id: string) {
    return this.petsRepository.getPetByIdRepository(id);
  }

  async getPetsByUserService(id: string): Promise<Pet[]> {
    return await this.petsRepository.getPetsByUserRepository(id);
  }

  async getPetRacesService(specie: string): Promise<Race[]> {
    return await this.petsRepository.getPetRacesRepository(specie);
  }

  async getPetSpeciesService(): Promise<Specie[]> {
    return await this.petsRepository.getPetSpeciesRepository();
  }

  getPetSpeciesandRacesService(): Promise<Specie[]> {
    return this.petsRepository.getPetSpeciesandRacesRepository();
  }

  getPetsSexService(): Promise<Sex[]> {
    return this.petsRepository.getPetsSexService();
  }

  async createPetService(createPetDto: CreatePetDto) {
    return this.petsRepository.createPetRepository(createPetDto);
  }

  async updatePetService(id: string, updatePetDto: Partial<Pet>) {
    return this.petsRepository.updatePetRepository(id, updatePetDto);
  }

  async removePetService(id: string) {
    return this.petsRepository.removePetRepository(id);
  }

  async uploadImgProfileService(id: string, file: Express.Multer.File) {
    const pet = await this.petsRepository.getPetByIdRepository(id);
    if (!pet) throw new BadRequestException('La mascota que desea actualizar no existe');
    const imgUpload = await this.cloudinaryService.uploadImage(file);
    await this.petsRepository.updatePetRepository(id, {
      imgProfile: imgUpload.secure_url,
    });
    return await this.petsRepository.getPetByIdRepository(id);
  }
}
