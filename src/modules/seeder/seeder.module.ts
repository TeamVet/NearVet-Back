import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Sex } from '../pets/entities/sex.entity';
import { Race } from '../pets/entities/race.entity';
import { Specie } from '../pets/entities/specie.entity';
import { StatesAppointment } from '../appointment/entities/statesAppointment.entity';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserRole, Sex, Race, Specie, StatesAppointment, Veterinarian,
                                      CategoryService, Service])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
