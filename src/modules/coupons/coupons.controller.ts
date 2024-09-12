import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({summary: "Obtiene todos los cupones"})
  @HttpCode(200)
  getAllCoupons() {
    return this.couponsService.getAllCouponsService();
  }

  @Get(':id')
  @ApiOperation({summary: "Obtiene un cupón por su ID"})
  @HttpCode(200)
  getCouponById(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.getCouponByIdService(id);
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo cupón"})
  @HttpCode(201)
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCouponService(createCouponDto);
  }

  @Put(':id')
  @ApiOperation({summary: "Actualiza un cupón existente"})
  @HttpCode(200)
  updateCoupon(@Param('id', ParseUUIDPipe) id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.updateCouponService(id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina un cupón"})
  @HttpCode(200)
  deleteCoupon(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.deleteCouponService(id);
  }
}
