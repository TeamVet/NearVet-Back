import { Test, TestingModule } from '@nestjs/testing';
import { SaleServicesController } from './sale-services.controller';
import { SaleServicesService } from './sale-services.service';

describe('SaleServicesController', () => {
  let controller: SaleServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleServicesController],
      providers: [SaleServicesService],
    }).compile();

    controller = module.get<SaleServicesController>(SaleServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
