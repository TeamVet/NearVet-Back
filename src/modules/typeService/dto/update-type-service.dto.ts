import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeServiceDto } from './create-type-service.dto';

export class UpdateTypeServiceDto extends PartialType(CreateTypeServiceDto) {}
