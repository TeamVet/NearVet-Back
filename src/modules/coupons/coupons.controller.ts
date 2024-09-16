import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
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
  getAllCoupons(@Query('page') page: number, @Query('limit') limit: number) {
    return this.couponsService.getAllCouponsService(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({summary: "Obtiene un cupón por su ID"})
  getCouponById(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.getCouponByIdService(id);
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo cupón"})
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCouponService(createCouponDto);
  }

  @Put(':id')
  @ApiOperation({summary: "Actualiza un cupón existente"})
  updateCoupon(@Param('id', ParseUUIDPipe) id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.updateCouponService(id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina un cupón"})
  deleteCoupon(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsService.deleteCouponService(id);
  }
}
