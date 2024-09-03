import { Injectable } from '@nestjs/common';
import { CreateClinicalExaminationDto } from './dto/create-clinical-examination.dto';
import { UpdateClinicalExaminationDto } from './dto/update-clinical-examination.dto';

@Injectable()
export class ClinicalExaminationService {
  create(createClinicalExaminationDto: CreateClinicalExaminationDto) {
    return 'This action adds a new clinicalExamination';
  }

  findAll() {
    return `This action returns all clinicalExamination`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalExamination`;
  }

  update(id: number, updateClinicalExaminationDto: UpdateClinicalExaminationDto) {
    return `This action updates a #${id} clinicalExamination`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalExamination`;
  }
}
