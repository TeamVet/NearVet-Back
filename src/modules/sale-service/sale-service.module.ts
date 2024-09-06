import { Module } from '@nestjs/common';
import { SaleServiceController } from './sale-service.controller';
import { SaleServiceService } from './sale-service.service';

@Module({
  controllers: [SaleServiceController],
  providers: [SaleServiceService]
})
export class SaleServiceModule {}
