import { Module } from '@nestjs/common';
import { SaleProductController } from './sale-product.controller';
import { SaleProductService } from './sale-product.service';

@Module({
  controllers: [SaleProductController],
  providers: [SaleProductService]
})
export class SaleProductModule {}
