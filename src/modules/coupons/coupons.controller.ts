import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({
    summary: "Obtiene todos los cupones",
    description: "Obtiene todos los cupones registrados hasta el momento"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener todos los cupones"
  })
  getAllCoupons() {
    return this.couponsService.getAllCouponsService();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Obtiene un cupón por su ID",
    description: "Obtiene un cupón específico utilizando su ID"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar obtener el cupón"
  })
  getCouponById(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.getCouponByIdService(id);
  }

  @Post()
  @ApiOperation({
    summary: "Crea un nuevo cupón",
    description: "Crea un nuevo cupón con la información proporcionada"
  })
  @HttpCode(201)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar crear el cupón"
  })
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCouponService(createCouponDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Actualiza un cupón existente",
    description: "Actualiza los detalles de un cupón específico por su ID"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar actualizar el cupón"
  })
  updateCoupon(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.updateCouponService(id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Elimina un cupón",
    description: "Elimina un cupón específico por su ID"
  })
  @HttpCode(200)
  @ApiInternalServerErrorResponse({
    description: "Error al intentar eliminar el cupón"
  })
  deleteCoupon(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.deleteCouponService(id);
  }
}
