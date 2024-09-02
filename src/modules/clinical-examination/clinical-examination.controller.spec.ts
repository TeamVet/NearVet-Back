import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalExaminationController } from './clinical-examination.controller';
import { ClinicalExaminationService } from './clinical-examination.service';

describe('ClinicalExaminationController', () => {
  let controller: ClinicalExaminationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalExaminationController],
      providers: [ClinicalExaminationService],
    }).compile();

    controller = module.get<ClinicalExaminationController>(ClinicalExaminationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
