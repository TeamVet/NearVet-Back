import { Test, TestingModule } from '@nestjs/testing';
import { FileTraetmentController } from './file-traetment.controller';
import { FileTraetmentService } from './file-traetment.service';

describe('FileTraetmentController', () => {
  let controller: FileTraetmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileTraetmentController],
      providers: [FileTraetmentService],
    }).compile();

    controller = module.get<FileTraetmentController>(FileTraetmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
