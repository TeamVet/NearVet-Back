/*import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, Put, Query } from '@nestjs/common';
import { TypeServiceService } from './type-service.service';
import { CreateTypeServiceDto } from './dto/create-type-service.dto';
import { UpdateTypeServiceDto } from './dto/update-type-service.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypeService } from './entities/typeService.entity';

@ApiTags("Type Services")
@Controller('type-service')
export class TypeServiceController {
  constructor(private readonly typeServiceService: TypeServiceService) {}

  @Get()
  @ApiOperation({
    summary: 'Devuelve todos los tipod de servicios',
    description: `Este endpoint devuelve un array con todos los tipos de servicios`})
  @HttpCode(HttpStatus.FOUND)
  @ApiNotFoundResponse({description: "No se encontro ningun tipo de servicio"})
  async getTypeServices(@Query("page") page:number=1, @Query("limit") limit:number=5): Promise<TypeService[]> {
    return await this.typeServiceService.getTypeServices(+page, +limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: 'devuleve el tipo de servicio pasado por ID',
    description: `Este endpoint devuelve el tipo de servicio pasado por ID `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"id", required:true, description:"Ingrese el Id del tipo de servicioa"})
  @ApiNotFoundResponse({description: "No se encontro ningun tipo de servicio"})
  async getTypeServiceById(@Param("id", ParseUUIDPipe) id: string): Promise<TypeService> {
      return await this.typeServiceService.getTypeServiceById(id)
  }

  @Get("typeService/:typeService")
  @ApiOperation({
    summary: 'devuleve el Tipo de productos pasando el nombre, ',
    description: `Este endpoint devuelve el Tipo de productos pasada por el nombre del tipo `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"typeService", required:true, description:"Ingrese el nombre del tipo de producto"})
  @ApiNotFoundResponse({description: "No se encontro ningun tipo de producto con ese nombre"})
  async getCategoryProductByTypeService(@Param("typeService") typeService: string): Promise<TypeService> {
      return await this.typeServiceService.getTypeServiceByTypeService(typeService);
  }

  @Get("servicio/:serviceId")
  @ApiOperation({
    summary: 'devuleve los tipos de productos asociados al servicio ingresado',
    description: `Este endpoint devuleve los tipos de productos asociados al servicio ingresado `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"serviceId", required:true, description:"Ingrese el ID del servicio"})
  @ApiNotFoundResponse({description: "No se encontro ningun tipo de producto para el servicio"})
  async getTypeServiceByServiceId(@Param("serviceId", ParseUUIDPipe) serviceId: string): Promise<TypeService[]> {
      return await this.typeServiceService.getTypeServiceByServiceId(serviceId);
  }


  @Post()
  @ApiOperation({summary: "Crea un nuevo tipo de Producto",
    description: "Esta ruta crea una nuevo tipo de producto con la informacion pasada por body y lo retorna"})
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({description: "No se pudo crear el tipo de producto"})
  @ApiBody({ description:"Ingrese los datos del nuevo tipo de producto", type:CreateTypeServiceDto})
  async createTypeServiceProduct(@Body() tService: CreateTypeServiceDto): Promise<TypeService> {
      return await this.typeServiceService.createTypeServiceProduct(tService);
  }

  @Put(":id")
  @ApiOperation({summary: "Actualiza un tipo de producto",
    description: "Esta ruta actualiza un tipo de producto pasado por Id con la informacion pasada por body y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el tipo de producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del tipo de producto"})
  @ApiBody({ description:"Ingrese los datos a actualizar", type:UpdateTypeServiceDto})
  async updateTypeServiceProduct(@Param("id", ParseUUIDPipe) id: string, @Body() tService: UpdateTypeServiceDto): Promise<string> {
      return await this.typeServiceService.updateTypeServiceProduct(id, tService)
  } 

  @Delete(":id")
  @ApiOperation({summary: "Elimina un tipo de producto",
    description: "Esta ruta elimina un ipo de producto pasado por Id y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el tipo de  producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del tipo de  producto"})
  async removeTypeServiceProduct(@Param("id", ParseUUIDPipe)id: string): Promise<string> {
      return await this.typeServiceService.removeTypeServiceProduct(id)
  }

}*/
