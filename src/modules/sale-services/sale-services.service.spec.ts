import { Test, TestingModule } from '@nestjs/testing';
import { SaleServicesService } from './sale-services.service';

describe('SaleServicesService', () => {
  let service: SaleServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleServicesService],
    }).compile();

    service = module.get<SaleServicesService>(SaleServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
