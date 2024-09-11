import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionRepository } from './prescription.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription])
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, PrescriptionRepository]
})
export class PrescriptionModule {}
