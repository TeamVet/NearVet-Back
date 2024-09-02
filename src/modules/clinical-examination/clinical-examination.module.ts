import { Module } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { ClinicalExaminationController } from './clinical-examination.controller';

@Module({
  controllers: [ClinicalExaminationController],
  providers: [ClinicalExaminationService],
})
export class ClinicalExaminationModule {}
