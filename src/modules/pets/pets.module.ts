import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetsRepository } from './pets.repository';
import { UsersModule } from '../users/users.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Sex } from './entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { Specie } from '../species/entities/specie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Sex, Specie, Race]), UsersModule],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository, CloudinaryService],
  exports: [PetsRepository],
})
export class PetsModule {}
