import { Test, TestingModule } from '@nestjs/testing';
import { MethodPayController } from './method-pay.controller';
import { MethodPayService } from './method-pay.service';

describe('MethodPayController', () => {
  let controller: MethodPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MethodPayController],
      providers: [MethodPayService],
    }).compile();

    controller = module.get<MethodPayController>(MethodPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
