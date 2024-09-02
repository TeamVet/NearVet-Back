import { Test, TestingModule } from '@nestjs/testing';
import { TypeServiceService } from './type-service.service';

describe('TypeServiceService', () => {
  let service: TypeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeServiceService],
    }).compile();

    service = module.get<TypeServiceService>(TypeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
