import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsRepository } from './pets.repository';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Specie } from './entities/specie.entity';
import { Sex } from './entities/sex.entity';
import { Race } from './entities/race.entity';

@Injectable()
export class PetsService {
    
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getPetsService() {
    return this.petsRepository.getPetsRepository();
  }

  async getPetByIdService(id: string) {
    return this.petsRepository.getPetByIdRepository(id);
  }

  async getPetsByUserService(id: string) {
    return await this.petsRepository.getPetsByUserRepository(id);
  }

  async getPetRacesService(specie: string): Promise<Race[]> {
    return await this.petsRepository.getPetRacesRepository(specie);
  }

  async getPetSpeciesService(): Promise<Specie[]> {
    return await this.petsRepository.getPetSpeciesRepository();
  }

  getPetSpeciesandRacesService(): Promise <Specie[]> {
    return this.petsRepository.getPetSpeciesandRacesRepository();
  }

  getPetsSexService(): Promise <Sex[]> {
    return this.petsRepository.getPetsSexService();
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

  async uploadImgProfileService(id: string, file: Express.Multer.File) {
    const pet = await this.petsRepository.getPetByIdRepository(id);
    if (!pet)
      throw new BadRequestException(
        'La mascota que desea actualizar no existe',
      );
    const imgUpload = await this.cloudinaryService.uploadImage(file);
    await this.petsRepository.updatePetRepository(id, {
      imgProfile: imgUpload.secure_url,
    });
    return await this.petsRepository.getPetByIdRepository(id);
  }
}
