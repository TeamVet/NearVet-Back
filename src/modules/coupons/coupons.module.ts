import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponsRepository } from './coupons.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponsController],
  providers: [CouponsService, CouponsRepository]
})
export class CouponsModule {}
