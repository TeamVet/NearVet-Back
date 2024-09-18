import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Pending } from './entities/pending.entity';

@Injectable()
export class PendingRepository {
  constructor(
    @InjectRepository(Pending) private pendingRepository: Repository<Pending>,
  ) {}

  async getAllPendingsRepository(page: number, limit: number): Promise<Pending[]> {
    return await this.pendingRepository.find({skip: (page-1)*limit, take:limit, relations: {service:true, pet:true}});
  }

  async getPendingByIdRepository(id: string): Promise<Pending> {
    return await this.pendingRepository.findOne({where:{ id }, relations: {service:true}});
  }

  async getAllUsersPendingRepository(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Pending[]> {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { pet: { userId }, endPending: LessThanOrEqual(today) },
      relations: { service: true, pet: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPendingByPetRepository(petId: string, page: number, limit: number) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { pet: { id: petId }, endPending: LessThanOrEqual(today) },
      relations: { service: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPendingByServiceRepository(serviceId: string, page: number, limit: number) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { service: { id: serviceId }, endPending: LessThanOrEqual(today) },
      relations: { service: true, pet: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getActivePendingRepository(page: number, limit: number) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { endPending: MoreThanOrEqual(today) },
      relations: { service: true, pet: { user: true } },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPendingByVeterinarianRepository(veterinarianId: string, page: number, limit: number) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { service: { veterinarian: { userId: veterinarianId } }, endPending: LessThanOrEqual(today) },  
      relations: { service: { veterinarian: true }, pet: true },  
      skip: (page - 1) * limit,
      take: limit,
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
