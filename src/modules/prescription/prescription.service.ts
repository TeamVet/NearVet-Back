import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionRepository } from './prescription.repository';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prescriptionRepository: PrescriptionRepository) {}

  async getAllPrescriptions() {
    const prescriptions = await this.prescriptionRepository.getAllPrescriptionsRepository();
    if (prescriptions.length === 0) {
      throw new NotFoundException('Hasta el momento no hay prescripciones registradas ...');
    }
    return {
      message: "Listado de prescripciones registradas",
      prescriptions
    };
  }

  async getPrescriptionById(id: string) {
    const prescription = await this.prescriptionRepository.getPrescriptionByIdRepository(id);
    if (!prescription) {
      throw new NotFoundException(`Prescripción con el ID ${id} no encontrada`);
    }
    return {
      message: `Prescripción con el ID ${id} encontrada exitosamente`,
      prescription
    };
  }

  async getAllPrescriptionsByPet(petId: string, page: number, limit: number, includeProducts: boolean) {
    const { prescriptions, total } = await this.prescriptionRepository.getAllPrescriptionsByPetRepository(petId, page, limit, includeProducts);
    if (total === 0) {
      throw new NotFoundException(`No se encontraron recetas para la mascota con ID ${petId}`);
    }
    return {
      message: `Listado de prescripciones para la mascota con ID ${petId}`,
      total,
      prescriptions,
    };
  }

  async createPrescription(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    return await this.prescriptionRepository.createPrescriptionRepository(createPrescriptionDto);
  }

  async updatePrescription(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.prescriptionRepository.updatePrescriptionRepository(id, updatePrescriptionDto);
    if (!prescription) {
      throw new NotFoundException(`Prescripción para modificar con el ID ${id} no encontrada`);
    }
    return {
      message: `Prescripción con el ID ${id} modificada exitosamente`,
      prescription
    };
  }

  async deletePrescription(id: string) {
    const prescription = await this.prescriptionRepository.getPrescriptionByIdRepository(id);
    if (!prescription) {
      throw new NotFoundException(`Prescripción para eliminar con el ID ${id} no encontrada`);
    }
    await this.prescriptionRepository.deletePrescriptionRepository(id);
    return {
      message: `Prescripción con el ID ${id} eliminada exitosamente`,
      prescription
    };
  }
}
