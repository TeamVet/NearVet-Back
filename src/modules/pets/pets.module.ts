import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetsRepository } from './pets.repository';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Sex } from './entities/sex.entity';
import { Specie } from './entities/specie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet, Sex, Specie]),
    UsersModule
  ],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository, CloudinaryService],
})
export class PetsModule {}
