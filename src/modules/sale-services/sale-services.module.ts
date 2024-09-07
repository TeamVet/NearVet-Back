import { Module } from '@nestjs/common';
import { SaleServiceService } from './sale-services.service';
import { SaleServiceController } from './sale-services.controller';
import { SaleServiceRepository } from './sale-service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleService } from './entities/sale-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleService])],
  controllers: [SaleServiceController],
  providers: [SaleServiceService, SaleServiceRepository],
})
export class SaleServicesModule {}
