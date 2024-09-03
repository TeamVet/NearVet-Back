import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';

@Controller('sale-products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @Post()
  create(@Body() createSaleProductDto: CreateSaleProductDto) {
    return this.saleProductsService.create(createSaleProductDto);
  }

  @Get()
  findAll() {
    return this.saleProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleProductDto: UpdateSaleProductDto) {
    return this.saleProductsService.update(+id, updateSaleProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleProductsService.remove(+id);
  }
}
