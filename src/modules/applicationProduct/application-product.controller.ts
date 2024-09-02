import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { CreateApplicationProductDto } from './dto/createApplicationProduct.dto';
import { UpdateApplicationProductDto } from './dto/updateApplicationProduct.dto';

@Controller('application-product')
export class ApplicationProductController {
  constructor(private readonly applicationProductService: ApplicationProductService) {}

  @Post()
  create(@Body() createApplicationProductDto: CreateApplicationProductDto) {
    return this.applicationProductService.create(createApplicationProductDto);
  }

  @Get()
  findAll() {
    return this.applicationProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationProductDto: UpdateApplicationProductDto) {
    return this.applicationProductService.update(+id, updateApplicationProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationProductService.remove(+id);
  }
}
