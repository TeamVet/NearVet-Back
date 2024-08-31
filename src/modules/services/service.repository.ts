import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ServiceRepository {
    
    constructor (@InjectRepository(Service) private readonly serviceRepository: Repository<Service>) {}

    async getServices(): Promise<Service[]> {
        return await this.serviceRepository.find();
    }

    async getServiceById(id: string): Promise<Service> {
        return await this.serviceRepository.findOne({where: {id}})
    }

    async getServiceByName (service:string): Promise<Service> {
        return await this.serviceRepository.findOne({where: {service}})
    }

    async getServicesByCategory (categoryServiceId:string): Promise<Service[]> {
        return await this.serviceRepository.find({where: {categoryServiceId}})
    }

    async getServicesByVeterinarian (veterinarianId:string): Promise<Service[]> {
        return await this.serviceRepository.find({where: {veterinarianId}})
    }

    async createService(service: Partial<Service>): Promise<Service> {
        return await this.serviceRepository.save(service);
    }

    async updateService(id: string, service: Partial<Service>): Promise<UpdateResult> {
        return await this.serviceRepository.update(id, service)
    }
  
    async removeService(id: string): Promise<DeleteResult> {
        return await this.serviceRepository.delete(id)
    }
}