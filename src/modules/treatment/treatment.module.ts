import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { TreatmentRepository } from './treatment.repository';
import { SaleServicesRepository } from '../sale-services/sale-services.repository';
import { SaleService } from '../sale-services/entities/sale-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, SaleService])],
  controllers: [TreatmentController],
  providers: [TreatmentService, TreatmentRepository, SaleServicesRepository],
})
export class TreatmentModule {}
