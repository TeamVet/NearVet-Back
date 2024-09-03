import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleServiceDto } from './create-sale-service.dto';

export class UpdateSaleServiceDto extends PartialType(CreateSaleServiceDto) {}
