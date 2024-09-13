import { Module } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { ClinicalExaminationController } from './clinical-examination.controller';
import { ClinicalExaminationRepository } from './clinical-examination.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalExamination } from './entities/clinicalExamination.entity';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalExamination, Veterinarian])],
  controllers: [ClinicalExaminationController],
  providers: [ClinicalExaminationService, ClinicalExaminationRepository],
})
export class ClinicalExaminationModule {}
