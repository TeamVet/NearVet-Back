import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import preloadServices from "../../seeds/services.json"
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { CategoryServiceRepository } from '../categoryServices/categoryServices.repository';

@Injectable() 
export class ServicesService {

  constructor (private readonly serviceRepository: ServiceRepository,
        private readonly veterinarianRepository: VeterinarianRepository,
        private readonly catServiceRepository: CategoryServiceRepository
  ){}
  
  async getServices(): Promise<Service[]> {
    const services: Service[] = await this.serviceRepository.getServices();
    if (services.length==0) throw new NotFoundException("No hay ninguna servicio cargado");
    return services;
  }

  async getServiceById(id: string): Promise<Service> {
    const catServ: Service = await this.serviceRepository.getServiceById(id);
    if (!catServ) {throw new NotFoundException("El servicio buscado no existe")}
    return catServ;
  }

  async getServiceByCategory(category: string): Promise<Service[]> {
    const services: Service[] = await this.serviceRepository.getServicesByCategory(category);
    if (services.length==0) {throw new NotFoundException(`La categoria de saervicio no tiene servicios asociados`)}
    return services;
  }
  
  async getServiceByVeterinairan(veterinarianId: string): Promise<Service[]> {
    const services: Service[] = await this.serviceRepository.getServicesByVeterinarian(veterinarianId);
    if (services.length==0) {throw new NotFoundException(`el Veterinario no tiene servicios asociados`)}
    return services;
  }

  async createService(createService: Partial<Service>): Promise<Service> {
    const serviceCreated: Service = await this.serviceRepository.createService(createService);
    if (!serviceCreated) {throw new InternalServerErrorException(`La creacion del servicio no pudo concretarse`)}
    return serviceCreated
  } 

  async updateService(id: string, service: Partial<Service>): Promise<string> {
    const serviceUpdate = await this.serviceRepository.updateService(id, service);
    if (serviceUpdate.affected !== 1) throw new NotFoundException(`El servicio que intenta actualizar no existe`)
    return id;
  }

  async removeService(id: string): Promise<string> {
    const serviceRemove = await this.serviceRepository.removeService(id)
    if (serviceRemove.affected !== 1) throw new NotFoundException(`El servicio que intenta eliminar no existe`)
    return id;
  }

  async preloadServices() {
   for (const service of preloadServices) {
      const serviceExist: Service = await this.serviceRepository.getServiceByName(service.service);

      if (!serviceExist) {
        const veterinarian: Veterinarian = await this.veterinarianRepository.getVeterinarianByLicence(service.licenceVet);
        const categoryService: CategoryService = await this.catServiceRepository.getCategoryServiceByCategory(service.category)
        if (veterinarian && categoryService) { 
          const {licenceVet, category, ...createService} = service
          await this.serviceRepository.createService({...createService, veterinarian});
        }
      }
    }
    console.log("Veterinarios Cargados Con Exito")
  }
}
