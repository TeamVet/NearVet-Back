import { Test, TestingModule } from '@nestjs/testing';
import { MethodPayService } from './method-pay.service';

describe('MethodPayService', () => {
  let service: MethodPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodPayService],
    }).compile();

    service = module.get<MethodPayService>(MethodPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
