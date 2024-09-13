import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query} from '@nestjs/common';
import { FileTreatmentService } from './file-treatment.service';
import { FileTreatment } from './entities/file-treatment.entity';
import { ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("File Treatment")
@Controller('file-traetment')
export class FileTreatmentController {
  constructor(private readonly fileTreatmentService: FileTreatmentService) {}

  @Get(":treatmentId")
  @ApiOperation({summary: 'devuleve los archivos de un tratamiento'})
  @ApiParam({name:"treatmentId", required:true, description:"Ingrese el Id del tratamiento"})
  async getFileByTreatmentId (@Param("treatmentId") treatmentId:string): Promise<FileTreatment[]> {
    return await this.fileTreatmentService.getFileByTreatmentId(treatmentId)
  }

  @Post(":treatmentId")
  @ApiOperation({summary: "Agrega un nuevo archivo al Tratamiento"})
  @ApiInternalServerErrorResponse({description: "No se pudo agregar el archivo al tratamiento"})
  @ApiParam({name: "treatmentId",  description:"Ingrese el Id del tratamiento" , required:true})
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: `Debe subir el Archivo de Imagen`,
            schema: { type: 'object', properties: { file: {type: 'string',format: 'binary'}}}})
          
  async addFile (@Param("treatmentId", ParseUUIDPipe) treatmentId: string, @UploadedFile(new ParseFilePipe())
  file: Express.Multer.File): Promise<FileTreatment> {
    return await this.fileTreatmentService.addFile(treatmentId, file)
  }

  @Delete(":id")
  @ApiOperation({summary: "Elimina un archivo de un tratamiento"})
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del arhivo"})
  async removeFile (@Param("id", ParseUUIDPipe) id:string): Promise<string> {
    return await this.fileTreatmentService.removeFile(id)  
  }
}
