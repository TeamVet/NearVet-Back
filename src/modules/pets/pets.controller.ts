import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Pets")
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  getPets() {
    return this.petsService.getPetsService();
  }

  @Get(':id')
  getPetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Get('user/:id')
  getPetsByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetsByUserService(id);
  }

  @Post()
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Put(':id')
  updatePet(@Param('id', ParseUUIDPipe) id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.updatePetService(id, updatePetDto);
  }

  @Delete(':id')
  removePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.removePetService(id);
  }
}
