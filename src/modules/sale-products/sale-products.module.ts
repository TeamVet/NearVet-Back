import { Module } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';
import { SaleProductsRepository } from './sale-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProduct } from './entities/sale-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProduct])],
  controllers: [SaleProductsController],
  providers: [SaleProductsService, SaleProductsRepository],
})
export class SaleProductsModule {}
