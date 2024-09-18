import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode, Query } from '@nestjs/common';
import { PendingService } from './pending.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePendingDto } from './dto/create-pending.dto';
import { UpdatePendingDto } from './dto/update-pending.dto';

@ApiTags('Pendings')
@Controller('pendings')
export class PendingController {
  constructor(private readonly pendingService: PendingService) {}

  @Get()
  @ApiOperation({summary: "Obtiene todas las pendientes"})
  getAllPendings(
    @Query("page") page:number = 1, 
    @Query("limit") limit:number = 5
  ) {
    return this.pendingService.getAllPendings(page, limit);
  }

  @Get('/user/:userId')
  @ApiOperation({summary: "Obtiene todas las pendientes de un usuario"})
  getAllUsersPending(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.pendingService.getAllUsersPending(userId, page, limit);
  }

  @Get('/pet/:petId')
  @ApiOperation({summary: "Obtiene pendientes por mascota"})
  getPendingByPet(
    @Param('petId', ParseUUIDPipe) petId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.pendingService.getPendingByPet(petId, page, limit);
  }

  @Get('/service/:serviceId')
  @ApiOperation({summary: "Obtiene pendientes por servicio"})
  getPendingByService(
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.pendingService.getPendingByService(serviceId, page, limit);
  }

  @Get('/active')
  @ApiOperation({summary: "Obtiene pendientes activas"})
  getActivePending(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 5
  ) {
    return this.pendingService.getActivePending(page, limit);
  }

  getPendingByVeterinarian(
    @Param('veterinarianId', ParseUUIDPipe) veterinarianId: string,
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.pendingService.getPendingByVeterinarian(veterinarianId, page, limit);
  }

  @Get(':id')
  @ApiOperation({summary: "Obtiene una pendiente por ID"})
  getPendingById(@Param('id', ParseUUIDPipe) id: string) {
    return this.pendingService.getPendingById(id);
  }
  
  @Post()
  @ApiOperation({summary: "Crea una nueva pendiente"})
  createPending(@Body() createPendingDto: CreatePendingDto) {
    return this.pendingService.createPending(createPendingDto);
  }

  @Put(':id')
  @ApiOperation({summary: "Actualiza una pendiente por ID"})
  updatePending(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePendingDto: UpdatePendingDto,
  ) {
    return this.pendingService.updatePending(id, updatePendingDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina una pendiente por ID"})
  deletePending(@Param('id', ParseUUIDPipe) id: string) {
    return this.pendingService.deletePending(id);
  }
}
