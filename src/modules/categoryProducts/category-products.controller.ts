import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryProductsService } from './category-products.service';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';

@Controller('category-products')
export class CategoryProductsController {
  constructor(private readonly categoryProductsService: CategoryProductsService) {}

  @Post()
  create(@Body() createCategoryProductDto: CreateCategoryProductDto) {
    return this.categoryProductsService.create(createCategoryProductDto);
  }

  @Get()
  findAll() {
    return this.categoryProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryProductDto: UpdateCategoryProductDto) {
    return this.categoryProductsService.update(+id, updateCategoryProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryProductsService.remove(+id);
  }
}
