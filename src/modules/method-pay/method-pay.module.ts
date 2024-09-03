import { Module } from '@nestjs/common';
import { MethodPayService } from './method-pay.service';
import { MethodPayController } from './method-pay.controller';

@Module({
  controllers: [MethodPayController],
  providers: [MethodPayService],
})
export class MethodPayModule {}
