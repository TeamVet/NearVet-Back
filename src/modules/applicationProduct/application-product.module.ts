import { Module } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { ApplicationProductController } from './application-product.controller';

@Module({
  controllers: [ApplicationProductController],
  providers: [ApplicationProductService],
})
export class ApplicationProductModule {}
