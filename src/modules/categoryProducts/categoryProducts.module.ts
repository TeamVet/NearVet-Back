import { Module } from '@nestjs/common';
import { CategoryProductsService } from './categoryProducts.service';
import { CategoryProductsController } from './categoryProducts.controller';
import { CategoryProductsRepository } from './categoryProducts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProduct } from './entities/categoryProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProduct])],
  controllers: [CategoryProductsController],
  providers: [CategoryProductsService, CategoryProductsRepository],
})
export class CategoryProductsModule {}
