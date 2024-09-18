import { Injectable, NotFoundException } from '@nestjs/common';
import { PendingRepository } from './pending.repository';
import { Pending } from './entities/pending.entity';
import { CreatePendingDto } from './dto/create-pending.dto';
import { UpdatePendingDto } from './dto/update-pending.dto';

@Injectable()
export class PendingService {
  constructor(private readonly pendingRepository: PendingRepository) {}

  async getAllPendings(page:number, limit:number) {
    return await this.pendingRepository.getAllPendingsRepository( page, limit);
  }

  async getPendingById(id: string) {
    return await this.pendingRepository.getPendingByIdRepository(id);
  }

  async getAllUsersPending(userId: string, page: number, limit: number): Promise<Pending[]> {
    return await this.pendingRepository.getAllUsersPendingRepository(userId, page, limit);
  }

  async getPendingByPet(petId: string, page: number, limit: number) {
    return await this.pendingRepository.getPendingByPetRepository(petId, page, limit);
  }

  async getPendingByService(serviceId: string, page: number, limit: number) {
    return await this.pendingRepository.getPendingByServiceRepository(serviceId, page, limit);
  }

  async getActivePending(page: number, limit: number) {
    return await this.pendingRepository.getActivePendingRepository(page, limit);
  }

  async getPendingByVeterinarian(veterinarianId: string, page: number, limit: number) {
    return await this.pendingRepository.getPendingByVeterinarianRepository(veterinarianId, page, limit);
  }

  async createPending(createPendingDto: CreatePendingDto): Promise<Pending> {
    return await this.pendingRepository.createPendingRepository(createPendingDto);
  }

  async updatePending(id: string, updatePendingDto: UpdatePendingDto) {
    return await this.pendingRepository.updatePendingRepository(id, updatePendingDto);
  }

  async deletePending(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    await this.pendingRepository.deletePendingRepository(id);
    return pending;
  }
}
