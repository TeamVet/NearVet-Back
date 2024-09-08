import { Test, TestingModule } from '@nestjs/testing';
import { PendingController } from './pending.controller';

describe('PendingController', () => {
  let controller: PendingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingController],
    }).compile();

    controller = module.get<PendingController>(PendingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
