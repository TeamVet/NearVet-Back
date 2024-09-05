/*import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TypeServiceRepository } from './type-service.repository';
import { TypeService } from './entities/typeService.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TypeServiceService {
 
  constructor (private readonly typeServiceRepository: TypeServiceRepository) {}

  async getTypeServices(page:number, limit:number): Promise<TypeService[]> {
    const typeServices: TypeService[] = await this.typeServiceRepository.getTypeServices(page, limit);
    if (typeServices.length===0) throw new NotFoundException("No se encontraron tipos de servicios");
    return typeServices;
  }

  async getTypeServiceById(id: string): Promise<TypeService> {
    const typeServiceFind: TypeService = await this.typeServiceRepository.getTypeServiceById(id)
    if (!typeServiceFind) throw new NotFoundException("No se encontro el tipo de servicio buscado");
    return typeServiceFind;
      return 
  }

  async getTypeServiceByServiceId(serviceId: string): Promise<TypeService[]> {
    const typeServices: TypeService[] = await this.typeServiceRepository.getTypeServiceByServiceId(serviceId)
    if (typeServices.length===0) throw new NotFoundException("No se encontraron tipos de servicios para el servicio");
    return typeServices;
  }

  async getTypeServiceByTypeService(typeService: string): Promise<TypeService> {
    const typeServiceFind: TypeService = await this.typeServiceRepository.getTypeServiceByTypeService(typeService);
    if (!typeServiceFind) throw new NotFoundException("No se encontro el tipo de servicio buscado");
    return typeServiceFind;
  }

  async createTypeServiceProduct(category: Partial<TypeService>): Promise<TypeService> {
    const typeServiceCreated: TypeService = await this.typeServiceRepository.createTypeServiceProduct(category);
    if (!typeServiceCreated) throw new InternalServerErrorException("No se pudo crear el tipo de servicio");
    return typeServiceCreated; 
  }
    
  async updateTypeServiceProduct(id: string, category: Partial<TypeService>): Promise<string> {
    const typeServiceUpdated: UpdateResult = await this.typeServiceRepository.updateTypeServiceProduct(id, category)
    if (typeServiceUpdated.affected===0) throw new NotFoundException("No se encontro el tipo de servicio a actualizar");
    return id;  
  } 

  async removeTypeServiceProduct(id: string): Promise<string> {
    const typeServiceDeleted: DeleteResult = await this.typeServiceRepository.removeTypeServiceProduct(id)
    if (typeServiceDeleted.affected===0) throw new NotFoundException("No se encontro el tipo de servicio a eliminar");
    return id;
  }

}
*/