import { Module } from '@nestjs/common';
import { TypeServiceService } from './type-service.service';
import { TypeServiceController } from './type-service.controller';

@Module({
  controllers: [TypeServiceController],
  providers: [TypeServiceService],
})
export class TypeServiceModule {}
