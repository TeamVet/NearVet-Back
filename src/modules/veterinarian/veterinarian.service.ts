import { Injectable } from '@nestjs/common';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { VeterinarianRepository } from './veterinarian.repository';
import preloadVeterinarian from "../../seeds/veterinarian.json"
import { Veterinarian } from './entities/veterinarian.entity';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class VeterinarianService {
  
  constructor(private readonly veterinarianRepository: VeterinarianRepository,
    private readonly userRepository: UsersRepository
  ){}

  create(createVeterinarianDto: CreateVeterinarianDto) {
    return 'This action adds a new veterinarian';
  }

  findAll() {
    return `This action returns all veterinarian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} veterinarian`;
  }

  update(id: number, updateVeterinarianDto: UpdateVeterinarianDto) {
    return `This action updates a #${id} veterinarian`;
  }

  remove(id: number) {
    return `This action removes a #${id} veterinarian`;
  }

  async preloadVeterinarian(): Promise<void> {
    console.log("preloadVeterinarian  ", preloadVeterinarian)
    for (const vet of preloadVeterinarian) {
      const vetExist: Veterinarian = await this.veterinarianRepository.getVeterinarianByLicence(vet.licence);

      if (!vetExist) { 
        const user:User= await this.userRepository.getUserByDniRepository(vet.dni);
        if (!user) { 
          const {dni, ...veterinarian} = vet
          await this.veterinarianRepository.createVeterinarian({...veterinarian, user});
        } 
      }
    }
    console.log("Veterinarios Cargados Con Exito")
  }
}
