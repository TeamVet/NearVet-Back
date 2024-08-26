import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetsRepository } from './pets.repository';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    UsersModule
  ],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository, CloudinaryService],
})
export class PetsModule {}
