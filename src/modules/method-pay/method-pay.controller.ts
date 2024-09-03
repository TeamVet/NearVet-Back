import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { MethodPayService } from './method-pay.service';
import { CreateMethodPayDto } from './dto/create-method-pay.dto';
import { UpdateMethodPayDto } from './dto/update-method-pay.dto';
import { ApiTags, ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('MethodPays')
@Controller('method-pays')
export class MethodPayController {
  constructor(private readonly methodPayService: MethodPayService) {}

  @Get()
  @ApiOperation({
    summary: "Obtiene todos los métodos de pago",
    description: "Obtiene todos los métodos de pago registrados hasta el momento"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener todos los métodos de pago"
  })
  getAllMethodPays() {
    return this.methodPayService.getAllMethodPays();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtiene un método de pago por ID",
    description: "Obtiene un método de pago específico usando su identificador"
  })
  @HttpCode(200)
  getMethodPayById(@Param('id', ParseUUIDPipe) id: string) {
    return this.methodPayService.getMethodPayById(id);
  }

  @Post()
  @ApiOperation({
    summary: "Crea un nuevo método de pago",
    description: "Crea un nuevo método de pago con la información proporcionada"
  })
  @HttpCode(201)
  createMethodPay(@Body() createMethodPayDto: CreateMethodPayDto) {
    return this.methodPayService.createMethodPay(createMethodPayDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Actualiza un método de pago existente",
    description: "Actualiza la información de un método de pago específico usando su ID"
  })
  @HttpCode(200)
  updateMethodPay(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMethodPayDto: UpdateMethodPayDto,
  ) {
    return this.methodPayService.updateMethodPay(id, updateMethodPayDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Elimina un método de pago",
    description: "Elimina un método de pago específico usando su identificador"
  })
  @HttpCode(204)
  deleteMethodPay(@Param('id', ParseUUIDPipe) id: string) {
    return this.methodPayService.deleteMethodPay(id);
  }
}
