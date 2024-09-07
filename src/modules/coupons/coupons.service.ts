import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponsRepository } from './coupons.repository';

@Injectable()
export class CouponsService {
  constructor(private readonly couponRepository: CouponsRepository) {}

  async getAllCouponsService() {
    const coupons = await this.couponRepository.getAllCouponsRepository();
    if (coupons.length === 0) {
      throw new NotFoundException('Hasta el momento no hay cupones registrados ...');
    }
    return {
      message: "Listado de cupones registrados",
      coupons
    };
  }

  async getCouponByIdService(id: string) {
    const coupon = await this.couponRepository.getCouponByIdRepository(id);
    if (!coupon) {
      throw new NotFoundException(`Cupón con el ID ${id} no encontrado`);
    }
    return {
      message: `Cupón con el ID ${id} encontrado exitosamente`,
      coupon
    };
  }

  async createCouponService(createCouponDto: CreateCouponDto) {
    const createdCoupon = await this.couponRepository.createCouponRepository(createCouponDto);
    return {
        message: `Cupón creado exitosamente`,
        createdCoupon
    }
  }

  async updateCouponService(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.updateCouponRepository(id, updateCouponDto);
    if (!coupon) {
      throw new NotFoundException(`Cupón para modificar con el ID ${id} no encontrado`);
    }
    return {
      message: `Cupón con el ID ${id} modificado exitosamente`,
      coupon
    };
  }

  async deleteCouponService(id: string) {
    const coupon = await this.couponRepository.getCouponByIdRepository(id);
    if (!coupon) {
      throw new NotFoundException(`Cupón para eliminar con el ID ${id} no encontrado`);
    }
    await this.couponRepository.deleteCouponRepository(id);
    return {
      message: `Cupón con el ID ${id} eliminado exitosamente`,
      coupon
    };
  }
}
