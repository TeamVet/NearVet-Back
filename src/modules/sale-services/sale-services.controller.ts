import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CreateSaleServiceDto } from './dto/create-sale-service.dto';
import { UpdateSaleServiceDto } from './dto/update-sale-service.dto';
import { ApiTags, ApiOperation, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SaleServiceService } from './sale-services.service';

@ApiTags('SaleService')
@Controller('sale-service')
export class SaleServiceController {
  constructor(private readonly saleServiceService: SaleServiceService) {}

  @Get()
  @ApiOperation({
    summary: "Obtiene todos los servicios de venta",
    description: "Obtiene todos los servicios de venta registrados hasta el momento"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener todos los servicios de venta"
  })
  async getAllSaleServices() {
    return this.saleServiceService.getAllSaleServices();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtiene un servicio de venta por ID",
    description: "Obtiene un servicio de venta específico por su ID"
  })
  @ApiNotFoundResponse({
    description: "Servicio de venta no encontrado"
  })
  async getSaleServiceById(@Param('id', ParseUUIDPipe) id: string) {
    return this.saleServiceService.getSaleServiceById(id);
  }

  @Post()
  @ApiOperation({
    summary: "Crea un nuevo servicio de venta",
    description: "Crea un nuevo servicio de venta con los datos proporcionados"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar crear un nuevo servicio de venta"
  })
  async createSaleService(@Body() createSaleServiceDto: CreateSaleServiceDto) {
    return this.saleServiceService.createSaleService(createSaleServiceDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Actualiza un servicio de venta",
    description: "Actualiza un servicio de venta existente con los datos proporcionados"
  })
  @ApiNotFoundResponse({
    description: "Servicio de venta no encontrado para actualización"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar actualizar el servicio de venta"
  })
  async updateSaleService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleServiceDto: UpdateSaleServiceDto
  ) {
    return this.saleServiceService.updateSaleService(id, updateSaleServiceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Elimina un servicio de venta",
    description: "Elimina un servicio de venta específico por su ID"
  })
  @ApiNotFoundResponse({
    description: "Servicio de venta no encontrado para eliminación"
  })
  @ApiInternalServerErrorResponse({
    description: "Error al intentar eliminar el servicio de venta"
  })
  async deleteSaleService(@Param('id', ParseUUIDPipe) id: string) {
    return this.saleServiceService.deleteSaleService(id);
  }
}
