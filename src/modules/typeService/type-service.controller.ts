import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeServiceService } from './type-service.service';
import { CreateTypeServiceDto } from './dto/create-type-service.dto';
import { UpdateTypeServiceDto } from './dto/update-type-service.dto';

@Controller('type-service')
export class TypeServiceController {
  constructor(private readonly typeServiceService: TypeServiceService) {}

  @Post()
  create(@Body() createTypeServiceDto: CreateTypeServiceDto) {
    return this.typeServiceService.create(createTypeServiceDto);
  }

  @Get()
  findAll() {
    return this.typeServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeServiceDto: UpdateTypeServiceDto) {
    return this.typeServiceService.update(+id, updateTypeServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeServiceService.remove(+id);
  }
}
