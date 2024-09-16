import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { CreateClinicalExaminationDto } from './dto/create-clinical-examination.dto';
import { UpdateClinicalExaminationDto } from './dto/update-clinical-examination.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClinicalExamination } from './entities/clinicalExamination.entity';

@ApiTags("clinical-examination")
@Controller('clinical-examination')
export class ClinicalExaminationController {
  constructor(private readonly clinicalExaminationService: ClinicalExaminationService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los exámenes clínicos con paginación' })
  async getExaminations (@Query('page') page: number, @Query('limit') limit: number): Promise<ClinicalExamination[]> {
    return await this.clinicalExaminationService.getExaminations(+page, +limit);
  }

  @Get('pet/:petId')
  @ApiOperation({ summary: 'Exámenes clínicos por mascota' })
  async getExaminationByPetId (
    @Param('petId', ParseUUIDPipe) petId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ): Promise<ClinicalExamination[]> {
    return await this.clinicalExaminationService.getExaminationByPetId(petId, page, limit);
  }

  @Get('veterinarian/:veterinarianId')
  @ApiOperation({ summary: 'Exámenes clínicos por veterinario' })
  async getExaminationByVeterinarianId (
    @Param('veterinarianId', ParseUUIDPipe) veterinarianId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ): Promise<ClinicalExamination[]> {
    return await this.clinicalExaminationService.getExaminationByVeterinarianId(veterinarianId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un examen clínico por ID' })
  async getExaminationById (
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ClinicalExamination> {
    return await this.clinicalExaminationService.getExaminationById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo examen clínico' })
  async createExamination (
    @Body() examination: CreateClinicalExaminationDto
  ): Promise<ClinicalExamination> {
    return await this.clinicalExaminationService.createExamination(examination);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un examen clínico por ID' })
  async updateExamination (
    @Param('id', ParseUUIDPipe) id: string,
    @Body() examination: UpdateClinicalExaminationDto
  ): Promise<string> {
    return await this.clinicalExaminationService.updateExamination(id, examination);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un examen clínico por ID' })
  async removeExamination (
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<string> {
    return await this.clinicalExaminationService.removeExamination(id);
  }
}
