import { Controller, Get, Post, Body, Param, Delete, HttpCode, Query, Put } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/createTreatment.dto';
import { UpdateTreatmentDto } from './dto/updateTreatment.dto';
import { Treatment } from './entities/treatment.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Treatment")
@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get()
  @ApiOperation({summary: "Devuelve todos los Tratamientos",
                description: "Esta ruta devuleve un array de objetos con todos los tratamientos que se realizaron hasta el momento"})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "No se encontraron tratamientos"})
  async getTreatments (): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatments();
  }

  @Get(":id")
  @ApiOperation({summary: "Devuelve un tratamiento por ID",
                description: "Esta ruta devuleve un objeto conlos datos del tratamiento pasado por ID"})
  @HttpCode(200)
  @ApiParam({name:"Id", required:true, description: "Ingrese el Id del tratamiento (uuid)"})
  @ApiNotFoundResponse({description: "No existe el tratamiento buscado"})
  async getTreatmentById (@Param("id") id:string): Promise<Treatment>  {
    return await this.treatmentService.getTreatmentById(id);
  }

  @Get("service/:serviceId")
  @ApiOperation({summary: "Devuelve los tratamientos relacionados con el servicio",
                description: "Esta ruta devulve un array con los tratamiento pasado por ID"})
  @HttpCode(200)
  @ApiParam({name:"serviceId", required:true, description: "Ingrese el Id del Servicio (uuid)"})
  @ApiNotFoundResponse({description: "No se encontraron tratamientos en el servicio especificado"})
  async getTreatmentsByService (@Param("serviceId") serviceId: string): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatmentsByService(serviceId)
  }

  @Get("typeService/:typeServiceId")
  @ApiOperation({summary: "Devuelve los tratamientos relacionados con el servicio",
                description: "Esta ruta devulve un array con los tratamiento pasado por ID"})
  @HttpCode(200)
  @ApiParam({name:"typeServiceId", required:true, description: "Ingrese el Id del Tipo de Servicio (uuid)"})
  @ApiNotFoundResponse({description: "No se encontraron tratamientos en el servicio especificado"})
  async getTreatmentsByTypeService (@Param("typeServiceId") typeServiceId: string): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatmentsByTypeService(typeServiceId)
  }

  @Get("dates/")
  @ApiOperation({summary: "Devuelve los tratamientos en el priodo especificado",
                description: "Esta ruta devulve un array con los tratamiento existentes en el periodo especificado"})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "No se encontraron tratamientos en el periodo especificado"})
  @ApiQuery({ name: 'startDate', required: true })
  @ApiQuery({ name: 'endDate', required: true })
  async getTreatmentsByDates (@Query("startDate") startDate: Date = new Date(), @Query("endDate") endDate: Date = new Date()): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatmentsByDates(startDate, endDate);
  }

  @Get("pet/:petId")
  @ApiOperation({summary: "Devuelve los tratamientos relacionados con la mascota",
                description: "Esta ruta devulve un array con los tratamiento relacionados con la mascota pasada por ID"})
  @HttpCode(200)
  @ApiParam({name:"petId", required:true, description: "Ingrese el Id de la Mascota (uuid)"})
  @ApiNotFoundResponse({description: "No se encontraron tratamientos en el servicio especificado"})
  async getTreatmentsByPet (petId: string): Promise<Treatment[]>  {
    return await this.treatmentService.getTreatmentsByPet(petId)
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo tratamiento",
                description: "Esta ruta crea un nuevo tratamiento con los datos pasados por el body"})
  @HttpCode(201)
  @ApiBody({description: "Ingrese los datos requeridos", type: CreateTreatmentDto})
  @ApiInternalServerErrorResponse({description: "No se pudo crear el nuevo tratamiento"})
  async createTreatment (@Body() treatment: CreateTreatmentDto): Promise<Treatment> {
    return await this.treatmentService.createTreatment(treatment)
  }

  @Put("id")
  @ApiOperation({summary: "Actualiza los datos de un tratamiento",
    description: "Esta ruta actualiza un tratamiento pasado por ID con los datos pasados por el body"})
  @HttpCode(201)
  @ApiParam({name:"id", required: true, description: "Ingrese el ID del tratamiento a actualizar"})
  @ApiBody({description: "Ingrese al menos un dato a modificar", type: UpdateTreatmentDto})
  @ApiNotFoundResponse({description: "No se encontraro el tratamiento a actualizar"})
  async updateTreatment (@Param("id") id: string , @Body() treatment: UpdateTreatmentDto): Promise<string> {
    return await this.treatmentService.updateTreatment(id, treatment)
  } 

  @Delete("id")
  @ApiOperation({summary: "Elimina un tratamiento",
    description: "Esta ruta elimina un tratamiento pasado por ID"})
  @HttpCode(201)
  @ApiParam({name:"id", required: true, description: "Ingrese el ID del tratamiento a eliminar"})
  @ApiNotFoundResponse({description: "No se encontraro el tratamiento a eliminar"})
  async removeTreatment (@Param("id") id: string): Promise<string> {
    return await this.treatmentService.removeTreatment(id)
  } 

}
