import { Module } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { ApplicationProductController } from './application-product.controller';
import { ApplicationProductRepository } from './application-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationProduct } from './entities/applicationProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationProduct])],
  controllers: [ApplicationProductController],
  providers: [ApplicationProductService, ApplicationProductRepository],
})
export class ApplicationProductModule {}
