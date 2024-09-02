import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TreatmentRepository } from './treatment.repository';
import { Treatment } from './entities/treatment.entity';

@Injectable()
export class TreatmentService {
  
  constructor (private readonly treatmentRepository: TreatmentRepository){}

  async getTreatments (): Promise<Treatment[]>  {
    const treatments: Treatment[] = await this.treatmentRepository.getTreatments();
    if (treatments.length === 0) throw new NotFoundException("No se encontraron tratamientos")
    return treatments;
}

async getTreatmentById (id:string): Promise<Treatment>  {
  const treatment: Treatment = await this.treatmentRepository.getTreatmentById(id);
  if (!treatment) throw new NotFoundException("No existe el tratamiento buscado")
  return treatment;
}

async getTreatmentsByService (serviceId: string): Promise<Treatment[]>  {
  const treatments: Treatment[] = await this.treatmentRepository.getTreatmentsByService(serviceId);
  if (treatments.length === 0) throw new NotFoundException("No se encontraron tratamientos en el servicio especificado")
  return treatments;
}

async getTreatmentsByTypeService (typeServiceId: string): Promise<Treatment[]>  {
  const treatments: Treatment[] = await this.treatmentRepository.getTreatmentsByTypeService(typeServiceId);
  if (treatments.length === 0) throw new NotFoundException("No se encontraron tratamientos en el tipo de servicio especificado")
  return treatments;
}

async getTreatmentsByDates (startDate: Date, endDate: Date): Promise<Treatment[]>  {
  const treatments: Treatment[] = await this.treatmentRepository.getTreatmentsByDates(startDate, endDate);
  if (treatments.length === 0) throw new NotFoundException("No se encontraron tratamientos en el periodo especificado")
  return treatments;
}

async getTreatmentsByPet (petId: string): Promise<Treatment[]>  {
  const treatments: Treatment[] = await this.treatmentRepository.getTreatmentsByPet(petId);
  if (treatments.length === 0) throw new NotFoundException("No se encontraron tratamientos para la mascota especificada")
  return treatments;
}

async createTreatment (treatment: Partial<Treatment>): Promise<Treatment> {
  const treatmentCreated: Treatment = await this.treatmentRepository.createTreatment(treatment);
  if (!treatmentCreated) throw new InternalServerErrorException("No se pudo crear el nuevo tratamiento")
  return treatmentCreated;
}

async updateTreatment (id: string , treatment: Partial<Treatment>): Promise<string> {
  const update = await this.treatmentRepository.updateTreatment(id, treatment);
  if (update.affected === 0) throw new NotFoundException("No se encontraro el tratamiento a actualizar")
  return id
} 

async removeTreatment (id: string): Promise<string> {
  const remove = await this.treatmentRepository.removeTreatment(id);
  if (remove.affected === 0) throw new NotFoundException("No se encontraro el tratamiento a eliminar")
  return id
} 
}
