import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryProductDto } from './createCategoryProduct.dto';

export class UpdateCategoryProductDto extends PartialType(CreateCategoryProductDto) {}
