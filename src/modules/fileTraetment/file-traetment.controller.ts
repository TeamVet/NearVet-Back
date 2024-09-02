import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileTraetmentService } from './file-traetment.service';
import { CreateFileTraetmentDto } from './dto/create-file-traetment.dto';
import { UpdateFileTraetmentDto } from './dto/update-file-traetment.dto';

@Controller('file-traetment')
export class FileTraetmentController {
  constructor(private readonly fileTraetmentService: FileTraetmentService) {}

  @Post()
  create(@Body() createFileTraetmentDto: CreateFileTraetmentDto) {
    return this.fileTraetmentService.create(createFileTraetmentDto);
  }   
 
  @Get()
  findAll() {
    return this.fileTraetmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileTraetmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileTraetmentDto: UpdateFileTraetmentDto) {
    return this.fileTraetmentService.update(+id, updateFileTraetmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileTraetmentService.remove(+id);
  }
}
