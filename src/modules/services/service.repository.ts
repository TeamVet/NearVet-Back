import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm";

@Injectable()
export class ServiceRepository {
    
    constructor (@InjectRepository(Service) private readonly serviceRepository: Repository<Service>) {}

    async getServiceByName (service:string) {
        return await this.serviceRepository.findOne({where: {service}})
    }

    async createService(service: Partial<Service>): Promise<Service> {
        return await this.serviceRepository.save(service);
      }
}