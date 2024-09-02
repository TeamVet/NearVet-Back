import { Module } from '@nestjs/common';
import { FileTraetmentService } from './file-traetment.service';
import { FileTraetmentController } from './file-traetment.controller';

@Module({
  controllers: [FileTraetmentController],
  providers: [FileTraetmentService],
})
export class FileTraetmentModule {}
