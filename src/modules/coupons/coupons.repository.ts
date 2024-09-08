import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coupon } from "./entities/coupon.entity";

@Injectable()
export class CouponsRepository {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async getAllCouponsRepository() {
    return await this.couponRepository.find();
  }

  async getCouponByIdRepository(id: string) {
    return await this.couponRepository.findOneBy({ id });
  }

  async createCouponRepository(createCouponDto) {
    const coupon = this.couponRepository.create(createCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async updateCouponRepository(id: string, updateCouponDto) {
    await this.couponRepository.update(id, updateCouponDto);
    return await this.couponRepository.findOneBy({ id });
  }

  async deleteCouponRepository(id: string): Promise<void> {
    await this.couponRepository.delete(id);
  }
}
