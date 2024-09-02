import { Module } from '@nestjs/common';
import { CategoryProductsService } from './category-products.service';
import { CategoryProductsController } from './category-products.controller';

@Module({
  controllers: [CategoryProductsController],
  providers: [CategoryProductsService],
})
export class CategoryProductsModule {}
