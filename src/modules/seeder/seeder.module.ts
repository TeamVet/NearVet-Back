import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Pet } from '../pets/entities/pet.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Sex } from '../pets/entities/sex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserRole, Sex])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
