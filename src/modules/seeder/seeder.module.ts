import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Sex } from '../pets/entities/sex.entity';
import { Race } from '../pets/entities/race.entity';
import { StatesAppointment } from '../appointment/entities/statesAppointment.entity';
import { Specie } from '../species/entities/specie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserRole, Sex, Race, Specie, StatesAppointment])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
