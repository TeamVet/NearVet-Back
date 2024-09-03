import { Module } from '@nestjs/common';
import { SaleServicesService } from './sale-services.service';
import { SaleServicesController } from './sale-services.controller';

@Module({
  controllers: [SaleServicesController],
  providers: [SaleServicesService],
})
export class SaleServicesModule {}
