import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationProductDto } from './createApplicationProduct.dto';

export class UpdateApplicationProductDto extends PartialType(CreateApplicationProductDto) {}
