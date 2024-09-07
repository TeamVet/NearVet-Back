import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { PendingService } from './pending.service';
import { ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePendingDto } from './dto/create-pending.dto';
import { UpdatePendingDto } from './dto/update-pending.dto';

@ApiTags('Pendings')
@Controller('pendings')
export class PendingController {
  constructor(private readonly pendingService: PendingService) {}

  @Get()
  @ApiOperation({
    summary: "Obtiene todas las pendientes",
    description: "Obtiene todas las pendientes registradas hasta el momento"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener todas las pendientes"
  })
  getAllPendings() {
    return this.pendingService.getAllPendings();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtiene una pendiente por ID",
    description: "Obtiene una pendiente basado en el ID proporcionado"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener la pendiente"
  })
  getPendingById(@Param('id', ParseUUIDPipe) id: string) {
    return this.pendingService.getPendingById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({
    summary: "Obtiene todas las pendientes de un usuario",
    description: "Obtiene todas las pendientes asociadas a un usuario específico"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener las pendientes del usuario"
  })
  getAllUsersPending(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.pendingService.getAllUsersPending(userId);
  }

  @Get('/pet/:petId')
  @ApiOperation({
    summary: "Obtiene pendientes por mascota",
    description: "Obtiene todas las pendientes relacionadas con una mascota específica"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener pendientes por mascota"
  })
  getPendingByPet(@Param('petId', ParseUUIDPipe) petId: string) {
    return this.pendingService.getPendingByPet(petId);
  }

  @Get('/service/:serviceId')
  @ApiOperation({
    summary: "Obtiene pendientes por servicio",
    description: "Obtiene todas las pendientes relacionadas con un servicio específico"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener pendientes por servicio"
  })
  getPendingByService(@Param('serviceId', ParseUUIDPipe) serviceId: string) {
    return this.pendingService.getPendingByService(serviceId);
  }

  @Get('/active')
  @ApiOperation({
    summary: "Obtiene pendientes activas",
    description: "Obtiene todas las pendientes que no han sido resueltas"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener pendientes activas"
  })
  getActivePending() {
    return this.pendingService.getActivePending();
  }

  @Get('/veterinarian/:veterinarianId')
  @ApiOperation({
    summary: "Obtiene pendientes por veterinario",
    description: "Obtiene todas las pendientes asignadas a un veterinario específico"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener pendientes por veterinario"
  })
  getPendingByVeterinarian(@Param('veterinarianId', ParseUUIDPipe) veterinarianId: string) {
    return this.pendingService.getPendingByVeterinarian(veterinarianId);
  }

  @Post()
  @ApiOperation({
    summary: "Crea una nueva pendiente",
    description: "Crea una nueva pendiente con la información proporcionada"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar crear la pendiente"
  })
  createPending(@Body() createPendingDto: CreatePendingDto) {
    return this.pendingService.createPending(createPendingDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Actualiza una pendiente por ID",
    description: "Actualiza una pendiente basado en el ID proporcionado y los datos proporcionados"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar actualizar la pendiente"
  })
  updatePending(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePendingDto: UpdatePendingDto,
  ) {
    return this.pendingService.updatePending(id, updatePendingDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Elimina una pendiente por ID",
    description: "Elimina una pendiente basado en el ID proporcionado"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar eliminar la pendiente"
  })
  deletePending(@Param('id', ParseUUIDPipe) id: string) {
    return this.pendingService.deletePending(id);
  }
}
