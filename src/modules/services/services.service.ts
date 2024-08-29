import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
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
  
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
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
