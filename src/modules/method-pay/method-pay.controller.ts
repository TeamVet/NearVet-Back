import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MethodPayService } from './method-pay.service';
import { CreateMethodPayDto } from './dto/create-method-pay.dto';
import { UpdateMethodPayDto } from './dto/update-method-pay.dto';

@Controller('method-pay')
export class MethodPayController {
  constructor(private readonly methodPayService: MethodPayService) {}

  @Post()
  create(@Body() createMethodPayDto: CreateMethodPayDto) {
    return this.methodPayService.create(createMethodPayDto);
  }

  @Get()
  findAll() {
    return this.methodPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.methodPayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMethodPayDto: UpdateMethodPayDto) {
    return this.methodPayService.update(+id, updateMethodPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.methodPayService.remove(+id);
  }
}
