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
    if (pendings.length === 0) {
      throw new NotFoundException('Hasta el momento no hay pendientes registradas...');
    }
    return {
      message: "Listado de pendientes registradas",
      pendings,
    };
  }

  async getPendingById(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    if (!pending) {
      throw new NotFoundException(`Pendiente con el ID ${id} no encontrada`);
    }
    return {
      message: `Pendiente con el ID ${id} encontrada exitosamente`,
      pending,
    };
  }

  async getAllUsersPending(userId: string) {
    const pendings = await this.pendingRepository.getAllUsersPendingRepository(userId);
    if (pendings.length === 0) {
      throw new NotFoundException(`No hay pendientes registradas para el usuario con ID ${userId}`);
    }
    return {
      message: `Listado de pendientes del usuario con ID ${userId}`,
      pendings
    };
  }

  async getPendingByPet(petId: string) {
    const pendings = await this.pendingRepository.getPendingByPetRepository(petId);
    if (pendings.length === 0) {
      throw new NotFoundException(`No hay pendientes registradas para la mascota con ID ${petId}`);
    }
    return {
      message: `Listado de pendientes de la mascota con ID ${petId}`,
      pendings
    };
  }

  async getPendingByService(serviceId: string) {
    const pendings = await this.pendingRepository.getPendingByServiceRepository(serviceId);
    if (pendings.length === 0) {
      throw new NotFoundException(`No hay pendientes registradas para el servicio con ID ${serviceId}`);
    }
    return {
      message: `Listado de pendientes del servicio con ID ${serviceId}`,
      pendings
    };
  }

  async getActivePending() {
    const pendings = await this.pendingRepository.getActivePendingRepository();
    if (pendings.length === 0) {
      throw new NotFoundException('No hay pendientes activas registradas.');
    }
    return {
      message: "Listado de pendientes activas",
      pendings
    };
  }

  async getPendingByVeterinarian(veterinarianId: string) {
    const pendings = await this.pendingRepository.getPendingByVeterinarianRepository(veterinarianId);
    if (pendings.length === 0) {
      throw new NotFoundException(`No hay pendientes registradas para el veterinario con ID ${veterinarianId}`);
    }
    return {
      message: `Listado de pendientes del veterinario con ID ${veterinarianId}`,
      pendings
    };
  }

  async createPending(createPendingDto: CreatePendingDto): Promise<Pending> {
    return await this.pendingRepository.createPendingRepository(createPendingDto);
  }

  async updatePending(id: string, updatePendingDto: UpdatePendingDto) {
    const pending = await this.pendingRepository.updatePendingRepository(id, updatePendingDto);
    if (!pending) {
      throw new NotFoundException(`Pendiente para modificar con el ID ${id} no encontrada`);
    }
    return {
      message: `Pendiente con el ID ${id} modificada exitosamente`,
      pending,
    };
  }

  async deletePending(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    if (!pending) {
      throw new NotFoundException(`Pendiente para eliminar con el ID ${id} no encontrada`);
    }
    await this.pendingRepository.deletePendingRepository(id);
    return {
      message: `Pendiente con el ID ${id} eliminada exitosamente`,
      pending,
    };
  }
}
