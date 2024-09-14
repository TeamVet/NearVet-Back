import { Injectable, NotFoundException } from '@nestjs/common';
import { PendingRepository } from './pending.repository';
import { Pending } from './entities/pending.entity';
import { CreatePendingDto } from './dto/create-pending.dto';
import { UpdatePendingDto } from './dto/update-pending.dto';

@Injectable()
export class PendingService {
  constructor(private readonly pendingRepository: PendingRepository) {}

  async getAllPendings() {
    const pendings = await this.pendingRepository.getAllPendingsRepository();
    return pendings;
  }

  async getPendingById(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    if (!pending) {
      throw new NotFoundException(`Pendiente con el ID ${id} no encontrada`);
    }
    return pending;
  }

  async getAllUsersPending(userId: string) {
    const pendings = await this.pendingRepository.getAllUsersPendingRepository(userId);
    return pendings;
  }

  async getPendingByPet(petId: string) {
    const pendings = await this.pendingRepository.getPendingByPetRepository(petId);
    return pendings

  }

  async getPendingByService(serviceId: string) {
    const pendings = await this.pendingRepository.getPendingByServiceRepository(serviceId);
    
    return pendings;
  }

  async getActivePending() {
    const pendings = await this.pendingRepository.getActivePendingRepository();
   
    return pendings;
  }

  async getPendingByVeterinarian(veterinarianId: string) {
    const pendings = await this.pendingRepository.getPendingByVeterinarianRepository(veterinarianId);
   
    return pendings;
  }

  async createPending(createPendingDto: CreatePendingDto): Promise<Pending> {
    return await this.pendingRepository.createPendingRepository(createPendingDto);
  }

  async updatePending(id: string, updatePendingDto: UpdatePendingDto) {
    const pending = await this.pendingRepository.updatePendingRepository(id, updatePendingDto);
    if (!pending) {
      throw new NotFoundException(`Pendiente para modificar con el ID ${id} no encontrada`);
    }
    return pending;
  }

  async deletePending(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    if (!pending) {
      throw new NotFoundException(`Pendiente para eliminar con el ID ${id} no encontrada`);
    }
    await this.pendingRepository.deletePendingRepository(id);
    return pending;
  }
}
