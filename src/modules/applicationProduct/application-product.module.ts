import { Module } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { ApplicationProductController } from './application-product.controller';
import { ApplicationProductRepository } from './application-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationProduct } from './entities/applicationProduct.entity';
import { SaleProductsRepository } from '../sale-products/sale-products.repository';
import { SaleProduct } from '../sale-products/entities/sale-product.entity';
import { TreatmentRepository } from '../treatment/treatment.repository';
import { Treatment } from '../treatment/entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationProduct, SaleProduct, Treatment])],
  controllers: [ApplicationProductController],
  providers: [ApplicationProductService, ApplicationProductRepository, SaleProductsRepository, TreatmentRepository],
})
export class ApplicationProductModule {}
