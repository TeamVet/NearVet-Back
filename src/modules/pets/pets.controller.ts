import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  getPets() {
    return this.petsService.getPetsService();
  }

  @Get(':id')
  getPetById(@Param('id') id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Post()
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Put(':id')
  updatePet(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.updatePetService(id, updatePetDto);
  }

  @Delete(':id')
  removePet(@Param('id') id: string) {
    return this.petsService.removePetService(id);
  }

  /*
  @Get(':id')
  getUserPetsById(@Param('idUser') id: string) {
    return this.petsService.getUserPetsByIdService();
  }
  */
}
