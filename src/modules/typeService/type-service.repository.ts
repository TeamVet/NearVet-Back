/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TypeService } from './entities/typeService.entity';

@Injectable()
export class TypeServiceRepository {
    constructor (@InjectRepository(TypeService) private typeServiceRepository: Repository<TypeService>){}

    async getTypeServices(page:number, limit:number): Promise<TypeService[]> {
        return await this.typeServiceRepository.find({skip: page*limit, take: limit});
    }

    async getTypeServiceById(id: string): Promise<TypeService> {
        return await this.typeServiceRepository.findOne({where: {id}})
    }

    async getTypeServiceByServiceId(serviceId: string): Promise<TypeService[]> {
        return await this.typeServiceRepository.find({where: {serviceId}})
    }

    async getTypeServiceByTypeService(typeService: string): Promise<TypeService> {
        return await this.typeServiceRepository.findOne({where: {typeService}});
    }

    async createTypeServiceProduct(category: Partial<TypeService>): Promise<TypeService> {
        return await this.typeServiceRepository.save(category);
    }
      
    async updateTypeServiceProduct(id: string, category: Partial<TypeService>): Promise<UpdateResult> {
        return await this.typeServiceRepository.update(id, category)
    } 
  
    async removeTypeServiceProduct(id: string): Promise<DeleteResult> {
        return await this.typeServiceRepository.delete(id)
    }

}
*/