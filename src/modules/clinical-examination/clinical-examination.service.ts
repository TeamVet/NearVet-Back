import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClinicalExaminationRepository } from './clinical-examination.repository';
import { ClinicalExamination } from './entities/clinicalExamination.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClinicalExaminationService {

  constructor (private readonly examinationRepository: ClinicalExaminationRepository,
    @InjectRepository(Veterinarian) private veterinarianRepository: Repository<Veterinarian>,
  ) {}

  async getExaminations (page:number, limit:number): Promise<ClinicalExamination[]> {
    return await this.examinationRepository.getExaminations(page,limit)
  }

  async getExaminationById (id:string): Promise<ClinicalExamination> {
    const examination:ClinicalExamination = await this.examinationRepository.getExaminationById(id)
    if (!examination) throw new NotFoundException("La Atencion Medica buscada no existe");
    return examination
  }

  async getExaminationByPetId (petId:string, page:number, limit:number): Promise<ClinicalExamination[]> {
      return await this.examinationRepository.getExaminationByPetId(petId, page,limit)
  }

  async getExaminationByVeterinarianId (veterinarianId:string, page:number, limit:number): Promise<ClinicalExamination[]> {
    return await this.examinationRepository.getExaminationByPetId(veterinarianId, page,limit)
  }

  async createExamination (examination:Partial<ClinicalExamination>): Promise<ClinicalExamination> {
    const veterinarian: Veterinarian = await this.veterinarianRepository.findOne({where: {userId:examination.veterinarianId}});
    const examinationCreated: ClinicalExamination = await this.examinationRepository.createExamination({...examination, veterinarianId: veterinarian.id})
    if (!examinationCreated) throw new InternalServerErrorException("No se pudo crear la Atencion Medica");
    // crear una orden de venta....
    return examinationCreated
  }

  async updateExamination (id: string, examination:Partial<ClinicalExamination>): Promise<string> {
    const examinationUpdate: UpdateResult = await this.examinationRepository.updateExamination(id, examination)
    if (examinationUpdate.affected === 0) throw new NotFoundException("No se encontro la atencion medica a}} actualizar");
    return id;
  }

  async removeExamination (id: string): Promise<string> {
    const examinationDelete: DeleteResult = await this.examinationRepository.removeExamination(id)
    if (examinationDelete.affected === 0) throw new NotFoundException("No se encontro la atencion medica a eliminar");
    return id;
  }
}
