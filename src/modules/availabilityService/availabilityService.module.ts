import { Module } from '@nestjs/common';
import { AvailabilityServiceService } from './availabilityService.service';
import { AvailabilityServiceController } from './availabilityService.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityService } from './entities/availability-service.entity';
import { AvailabilityServiceRepository } from './availabilityService.repository';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinarian, AvailabilityService, Appointment])],
  controllers: [AvailabilityServiceController],
  providers: [AvailabilityServiceService, AvailabilityServiceRepository,
              VeterinarianRepository],
})
export class AvailabilityServiceModule {}
