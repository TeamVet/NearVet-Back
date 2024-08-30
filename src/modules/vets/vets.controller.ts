import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VetsService } from './vets.service';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Get()
  getAllVeterinary() {
    return this.vetsService.getAllVeterinaryService();
  }

  @Get(':id')
  getVeterinaryById(@Param('id') id: string) {
    return this.vetsService.getVeterinaryByIdService(id);
  }

  @Post()
  createVeterinary(@Body() createVetDto: CreateVetDto) {
    return this.vetsService.createVeterinaryService(createVetDto);
  }

  @Patch(':id')
  updateVeterinary(@Param('id') id: string, @Body() updateVetDto: UpdateVetDto) {
    return this.vetsService.updateVeterinaryService(id, updateVetDto);
  }

  @Delete(':id')
  removeVeterinary(@Param('id') id: string) {
    return this.vetsService.removeVeterinaryService(id);
  }
}
