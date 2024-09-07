import { Module } from '@nestjs/common';
import { SaleServicesService } from './sale-services.service';
import { SaleServicesController } from './sale-services.controller';
import { SaleService } from './entities/sale-service.entity';
import { SaleServicesRepository } from './sale-services.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SaleService])],
  controllers: [SaleServicesController],
  providers: [SaleServicesService, SaleServicesRepository],
})
export class SaleServicesModule {}
