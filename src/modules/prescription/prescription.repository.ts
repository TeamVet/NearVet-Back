import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionRepository {
  constructor(
    @InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>,
  ) {}

  async getAllPrescriptionsRepository() {
    return await this.prescriptionRepository.find();
  }

  async getPrescriptionByIdRepository(id: string) {
    return await this.prescriptionRepository.findOneBy({ id });
  }

  async getAllPrescriptionsByPetRepository(petId: string, page: number, limit: number, includeProducts: boolean) {
    const queryBuilder = this.prescriptionRepository.createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.product', 'product')
      .where('product.petId = :petId', { petId });

    if (includeProducts) {
      queryBuilder.leftJoinAndSelect('prescription.product', 'product');
    }

    const [prescriptions, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return prescriptions;
  }

  /*
  async getPrescriptionById(id: string) {
    return await this.prescriptionRepository.findOne(id, { relations: ['product'] }); 
  }

  async getPrescriptionsByExamination(examinationId: string): Promise<Prescription[]> {
    return await this.prescriptionRepository.find({
      where: { clinicalExamination: { id: examinationId } },
      relations: ['product'], 
    });
  }

  async createPrescription(createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepository.create(createPrescriptionDto);
    return await this.prescriptionRepository.save(prescription);
  }
  */


  async createPrescriptionRepository(prescription: Partial<Prescription>) {
    return await this.prescriptionRepository.save(prescription);
  }

  async updatePrescriptionRepository(id: string, prescription: Partial<Prescription>) {
    await this.prescriptionRepository.update(id, prescription);
    return await this.prescriptionRepository.findOneBy({ id });
  }

  async deletePrescriptionRepository(id: string) {
    await this.prescriptionRepository.delete(id);
  }
}
