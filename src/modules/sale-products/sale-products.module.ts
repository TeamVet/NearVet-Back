import { Module } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';

@Module({
  controllers: [SaleProductsController],
  providers: [SaleProductsService],
})
export class SaleProductsModule {}
