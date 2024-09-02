import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalExaminationService } from './clinical-examination.service';

describe('ClinicalExaminationService', () => {
  let service: ClinicalExaminationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalExaminationService],
    }).compile();

    service = module.get<ClinicalExaminationService>(ClinicalExaminationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
