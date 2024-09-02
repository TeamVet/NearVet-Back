import { Test, TestingModule } from '@nestjs/testing';
import { FileTraetmentService } from './file-traetment.service';

describe('FileTraetmentService', () => {
  let service: FileTraetmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileTraetmentService],
    }).compile();

    service = module.get<FileTraetmentService>(FileTraetmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
