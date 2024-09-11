import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Sex } from '../pets/entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { StatesAppointment } from '../appointment/entities/statesAppointment.entity';
import { Specie } from '../species/entities/specie.entity';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { Service } from '../services/entities/service.entity';
import { AvailabilityService } from '../availabilityService/entities/availability-service.entity';
import { RepCondition } from '../pets/entities/repCondition.entity';
import { Product } from '../products/entities/product.entity';
import { Vet } from '../vets/entities/vet.entity';
import { Pending } from '../pending/entities/pending.entity';
import { Appointment } from '../appointment/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserRole, Sex, Race, Specie, StatesAppointment, Veterinarian,
                                      CategoryService, Service, AvailabilityService, RepCondition, Product, 
                                      Vet, Pending, Appointment])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
