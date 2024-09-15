import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { VetsService } from './vets.service';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Vets')
@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene el listado de todas las veterinarias',
    description: 'Obtiene el listado de todas las veterinarias'
  })
  @ApiInternalServerErrorResponse({description: 'Error al intentar obtener veterinarias' })
  getAllVeterinary() {
    return this.vetsService.getAllVeterinaryService();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una veterinaria por su ID',
    description: 'Obtiene la información de una veterinaria específica por su ID',
  })
  @ApiOkResponse({ description: 'Veterinaria obtenida exitosamente' })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada' })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar obtener la veterinaria',
  })
  getVeterinaryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.vetsService.getVeterinaryByIdService(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva veterinaria',
    description: 'Crea una nueva veterinaria con los datos proporcionados',
  })
  @ApiBody({ description: 'Las credenciales', type: CreateVetDto })
  @ApiCreatedResponse({ description: 'Veterinaria creada exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos proporcionados' })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar crear la veterinaria',
  })
  createVeterinary(@Body() createVetDto: CreateVetDto) {
    return this.vetsService.createVeterinaryService(createVetDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza una veterinaria existente',
    description: 'Actualiza una veterinaria existente con los datos proporcionados por ID',
  })
  @ApiOkResponse({ description: 'Veterinaria actualizada exitosamente' })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada' })
  @ApiBadRequestResponse({ description: 'Datos inválidos proporcionados' })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar actualizar la veterinaria',
  })
  updateVeterinary(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateVetDto: UpdateVetDto
  ) {
    return this.vetsService.updateVeterinaryService(id, updateVetDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una veterinaria existente',
    description: 'Elimina una veterinaria específica por su ID',
  })
  @ApiOkResponse({ description: 'Veterinaria eliminada exitosamente' })
  @ApiNotFoundResponse({ description: 'Veterinaria no encontrada' })
  @ApiInternalServerErrorResponse({
    description: 'Error al intentar eliminar la veterinaria',
  })
  removeVeterinary(@Param('id', ParseUUIDPipe) id: string) {
    return this.vetsService.removeVeterinaryService(id);
  }
}
