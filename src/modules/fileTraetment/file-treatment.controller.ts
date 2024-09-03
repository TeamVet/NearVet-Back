import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query} from '@nestjs/common';
import { FileTreatmentService } from './file-treatment.service';
import { UpdateFileTreatmentDto } from './dto/update-file-treatment.dto';
import { FileTreatment } from './entities/file-treatment.entity';
import { ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("File Treatment")
@Controller('file-traetment')
export class FileTreatmentController {
  constructor(private readonly fileTreatmentService: FileTreatmentService) {}

  @Get(":treatmentId")
  @ApiOperation({
    summary: 'devuleve los archivos de un tratamiento',
    description: `Este endpoint devuelve todos los archivos de un tratameinto pasado por ID `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"treatmentId", required:true, description:"Ingrese el Id del tratamiento"})
  @ApiNotFoundResponse({description: "no se encontraron archivos para el tratamiento"})
  async getFileByTreatmentId (@Param("treatmentId") treatmentId:string): Promise<FileTreatment[]> {
    return await this.fileTreatmentService.getFileByTreatmentId(treatmentId)
  }

  @Post()
  @ApiOperation({summary: "Agrega un nuevo archivo al Tratamiento",
    description: "Esta ruta agrega un nuevo archivo al tratamiento, con la informacion pasada por body"})
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({description: "No se pudo agregar el archivo al tratamiento"})
  @ApiQuery({name: "treatmentId",  description:"Ingrese el Id del tratamiento" , required:true})
  @ApiQuery({name: "description",  description:"Ingrese la descripcion de la imagen" , required:false})
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: `Debe subir el Archivo de Imagen`,
            schema: { type: 'object', properties: { file: {type: 'string',format: 'binary'}}}})
          
  async addFile (@Query("treatmentId") treatmentId: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 2000000,
          message: 'El Archivo debe ser menor a 2000Kb',
        }),
         new FileTypeValidator({
           fileType: /(.jpg|.jpeg|.png|.webp|.pdf|.*doc|.)$/,
         }),
      ],
    }),
  )
  file: Express.Multer.File,  @Query("description") description?: string): Promise<FileTreatment> {
    return await this.fileTreatmentService.addFile(treatmentId, file, description)
  }

  @Put(":id")
  @ApiOperation({summary: "Actualiza la descripcion de un archivo",
    description: "Esta ruta actualiza un archivo pasado por Id con la informacion pasada por body y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el archivo a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del archivo"})
  @ApiBody({ description:"Ingrese los datos a actualizar", type:UpdateFileTreatmentDto})
  async updateFile (@Param("id", ParseUUIDPipe) id:string, @Body() file:UpdateFileTreatmentDto): Promise<string> {
    return await this.fileTreatmentService.updateFile(id, file);
  }

  @Delete(":id")
  @ApiOperation({summary: "Elimina un archivo de un tratamiento",
    description: "Esta ruta elimina un archivo pasado por Id y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el archivo a eliminar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del arhivo"})
  async removeFile (@Param("id", ParseUUIDPipe) id:string): Promise<string> {
    return await this.fileTreatmentService.removeFile(id)  
  }
}
