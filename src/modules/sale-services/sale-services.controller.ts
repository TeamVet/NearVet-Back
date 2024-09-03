import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleServicesService } from './sale-services.service';
import { CreateSaleServiceDto } from './dto/create-sale-service.dto';
import { UpdateSaleServiceDto } from './dto/update-sale-service.dto';

@Controller('sale-services')
export class SaleServicesController {
  constructor(private readonly saleServicesService: SaleServicesService) {}

  @Post()
  create(@Body() createSaleServiceDto: CreateSaleServiceDto) {
    return this.saleServicesService.create(createSaleServiceDto);
  }

  @Get()
  findAll() {
    return this.saleServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleServiceDto: UpdateSaleServiceDto) {
    return this.saleServicesService.update(+id, updateSaleServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleServicesService.remove(+id);
  }
}
