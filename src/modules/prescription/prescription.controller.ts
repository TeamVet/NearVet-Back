import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode, Query } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get()
  @ApiOperation({
    summary: "Obtiene todas las prescripciones",
    description: "Obtiene todas las prescripciones registradas hasta el momento"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener todas las prescripciones"
  })
  getAllPrescriptions() {
    return this.prescriptionService.getAllPrescriptions();
  }

  @Get('pet/:petId')
  @ApiOperation({ 
    summary: 'Obtiene todas las prescripciones por mascota especifica', 
    description: 'Obtiene todas las recetas de una mascota específica, con opción de incluir productos asociados.' 
  })
  @ApiParam({ name: 'petId', description: 'El ID de la mascota', type: String, required: true })
  @ApiQuery({ name: 'page', description: 'Número de página para la paginación', type: Number, required: false })
  @ApiQuery({ name: 'limit', description: 'Número de elementos por página', type: Number, required: false })
  @ApiQuery({ name: 'includeProducts', description: 'Si debe incluir los productos asociados a las recetas', type: Boolean, required: false })
  @ApiResponse({ status: 200, description: 'Listado de recetas obtenidas satisfactoriamente', type: [Prescription] })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
  async getAllPrescriptionsByPet(
    @Param('petId') petId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('includeProducts') includeProducts: boolean
  ) {
    return await this.prescriptionService.getAllPrescriptionsByPet(petId, page, limit, includeProducts);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtiene una prescripción por ID",
    description: "Obtiene una prescripción basado en el ID proporcionado"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener la prescripción"
  })
  getPrescriptionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionService.getPrescriptionById(id);
  }

  @Post()
  @ApiOperation({
    summary: "Crea una nueva prescripción",
    description: "Crea una nueva prescripción con la información proporcionada"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar crear la prescripción"
  })
  createPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.createPrescription(createPrescriptionDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Actualiza una prescripción por ID",
    description: "Actualiza una prescripción basado en el ID proporcionado y los datos proporcionados"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar actualizar la prescripción"
  })
  updatePrescription(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.updatePrescription(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Elimina una prescripción por ID",
    description: "Elimina una prescripción basado en el ID proporcionado"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar eliminar la prescripción"
  })
  deletePrescription(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionService.deletePrescription(id);
  }
}
