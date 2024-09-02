import { Test, TestingModule } from '@nestjs/testing';
import { TypeServiceController } from './type-service.controller';
import { TypeServiceService } from './type-service.service';

describe('TypeServiceController', () => {
  let controller: TypeServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeServiceController],
      providers: [TypeServiceService],
    }).compile();

    controller = module.get<TypeServiceController>(TypeServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
