import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductsController } from './category-products.controller';
import { CategoryProductsService } from './category-products.service';

describe('CategoryProductsController', () => {
  let controller: CategoryProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryProductsController],
      providers: [CategoryProductsService],
    }).compile();

    controller = module.get<CategoryProductsController>(CategoryProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
