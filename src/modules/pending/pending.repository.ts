import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pending } from './entities/pending.entity';

@Injectable()
export class PendingRepository {
  constructor(
    @InjectRepository(Pending) private pendingRepository: Repository<Pending>,
  ) {}

  async getAllPendingsRepository(): Promise<Pending[]> {
    return await this.pendingRepository.find();
  }

  async getPendingByIdRepository(id: string): Promise<Pending> {
    return await this.pendingRepository.findOneBy({ id });
  }

  async getAllUsersPendingRepository(userId: string): Promise<Pending[]> {
    return await this.pendingRepository.find({
      where: {
        user: { id: userId },  
      },
      relations: ['user'], 
    });
  }

  async getPendingByPetRepository(petId: string) {
    return await this.pendingRepository.find({
      where: { pet: { id: petId } },
      relations: {pet:true }, 
    });
  }

  async getPendingByServiceRepository(serviceId: string) {
    return await this.pendingRepository.find({
      where: { service: { id: serviceId } },
      relations: ['service'], 
    });
  }

  async getActivePendingRepository() {
    return await this.pendingRepository.find({
      where: { endPending: null },  
      relations: ['service', 'pet', 'user'],  
    });
  }

  async getPendingByVeterinarianRepository(veterinarianId: string) {
    return await this.pendingRepository.find({
      where: { user: { id: veterinarianId } },  
      relations: ['user'],  
    });
  }

  async createPendingRepository(pending: Partial<Pending>): Promise<Pending> {
    return await this.pendingRepository.save(pending);
  }

  async updatePendingRepository(id: string, pending: Partial<Pending>): Promise<Pending> {
    await this.pendingRepository.update(id, pending);
    return await this.pendingRepository.findOneBy({ id });
  }

  async deletePendingRepository(id: string): Promise<void> {
    await this.pendingRepository.delete(id);
  }
}
