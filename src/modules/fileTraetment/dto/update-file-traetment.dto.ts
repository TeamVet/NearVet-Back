import { PartialType } from '@nestjs/mapped-types';
import { CreateFileTraetmentDto } from './create-file-traetment.dto';

export class UpdateFileTraetmentDto extends PartialType(CreateFileTraetmentDto) {}
