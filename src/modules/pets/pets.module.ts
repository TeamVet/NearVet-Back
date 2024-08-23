import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './entities/pet.entity';
import { PetsRepository } from './pets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pets])
  ],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
})
export class PetsModule {}
