import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ClinicalExaminationService } from './clinical-examination.service';
import { CreateClinicalExaminationDto } from './dto/create-clinical-examination.dto';
import { UpdateClinicalExaminationDto } from './dto/update-clinical-examination.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClinicalExamination } from './entities/clinicalExamination.entity';

@ApiTags("Clinicals Examinations")
@Controller('clinical-examination')
export class ClinicalExaminationController {
  constructor(private readonly clinicalExaminationService: ClinicalExaminationService) {}

  @Get()
  async getExaminations (@Query("page") page:number= 1, @Query("limit") limit:number = 5): Promise<ClinicalExamination[]> {
    return await this.clinicalExaminationService.getExaminations(page,limit)
  }

  @Get(":id")
  async getExaminationById (@Param("id", ParseUUIDPipe) id:string): Promise<ClinicalExamination> {
    return await this.clinicalExaminationService.getExaminationById(id)
   
  }

  @Get("pet/:petId")
  async getExaminationByPetId (@Param("petId", ParseUUIDPipe) petId:string,
                               @Query("page") page:number = 1, 
                               @Query("limit") limit:number = 5): Promise<ClinicalExamination[]> {
      return await this.clinicalExaminationService.getExaminationByPetId(petId, page,limit)
  }

  @Get("veterinarian/:veterinarianId")
  async getExaminationByVeterinarianId (@Param("veterinarianId", ParseUUIDPipe) veterinarianId:string,
                               @Query("page") page:number = 1, 
                               @Query("limit") limit:number = 5): Promise<ClinicalExamination[]> {
    return await this.clinicalExaminationService.getExaminationByPetId(veterinarianId, page,limit)
  }

  @Post()
  async createExamination (@Body() examination:CreateClinicalExaminationDto): Promise<ClinicalExamination> {
    return await this.clinicalExaminationService.createExamination(examination)

  }

  @Put(":id")
  async updateExamination (@Param("id", ParseUUIDPipe) id: string, 
                           @Body() examination:UpdateClinicalExaminationDto): Promise<string> {
    return await this.clinicalExaminationService.updateExamination(id, examination);
  }

  @Delete(":id")
  async removeExamination (@Param("id", ParseUUIDPipe) id: string,): Promise<string> {
    return await this.clinicalExaminationService.removeExamination(id)
  }
}
