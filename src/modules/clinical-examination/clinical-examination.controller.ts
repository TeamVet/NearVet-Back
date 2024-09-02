import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { CreateClinicalExaminationDto } from './dto/create-clinical-examination.dto';
import { UpdateClinicalExaminationDto } from './dto/update-clinical-examination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Clinicals Examinations")
@Controller('clinical-examination')
export class ClinicalExaminationController {
  constructor(private readonly clinicalExaminationService: ClinicalExaminationService) {}

  @Post()
  create(@Body() createClinicalExaminationDto: CreateClinicalExaminationDto) {
    return this.clinicalExaminationService.create(createClinicalExaminationDto);
  }

  @Get()
  findAll() {
    return this.clinicalExaminationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalExaminationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicalExaminationDto: UpdateClinicalExaminationDto) {
    return this.clinicalExaminationService.update(+id, updateClinicalExaminationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalExaminationService.remove(+id);
  }
}
