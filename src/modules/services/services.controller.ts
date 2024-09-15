import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Service } from './entities/service.entity';

@ApiTags("Services")
@Controller('services')
export class ServicesController {

  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna todos los datos de todas los servicios',
    description: `Este endpoint devuelve un array con cada una de los servicios que tiene la veterinaria.
                  En Caso de no haber ningun servicio retorna un error informandolo`})
  @HttpCode(200)
  async getServices(): Promise<Service[]> {
    return await this.servicesService.getServices();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna todos los datos del servicio requerido por ID',
    description: `Este endpoint devuelve un objeto con todos los datos del servicio 
                  que este relacionado al ID pasado por parametro`})
  @HttpCode(200)
  async getServiceById(@Param('id', ParseUUIDPipe) id: string): Promise<Service> {
    return await this.servicesService.getServiceById(id);
  }

  @Get('category/:cat')
  @ApiOperation({
    summary: 'Retorna un array con todos los datos de los servicios contenidos por la categoria',
    description: `Este endpoint devuelve un array de objetos con todos los datos de los servicio 
                  que esten relacionados a la categoria pasado por parametro`})
  @HttpCode(200)
  async getServiceByCategory(@Param('cat') categoriaId: string): Promise<Service[]> {
    return await this.servicesService.getServiceByCategory(categoriaId);
  }

  @Get('veterinarian/:vet')
  @ApiOperation({
    summary: 'Retorna todos los datos de los servicio asociados al veterinario pasado por ID',
    description: `Este endpoint devuelve un array de objetos con todos los datos de los servicios
                  que esten relacionados al veterinario pasado por parametro`})
  @HttpCode(200)
  async getServiceByVeterinarian(@Param('vet') veterinarianId: string): Promise<Service[]> {
    return await this.servicesService.getServiceByVeterinairan(veterinarianId);
  }
  
  @Post()
  @ApiOperation({
    summary: 'Registra un servicio nuevo',
    description: `Aqui se pueden registrar los servicios que la veterniaria va a tener`})
  @ApiBody({ description: 'Ingesar los datos del servicio', type: CreateServiceDto })
  @HttpCode(201)
  async createService(@Body() createCategoryService: CreateServiceDto):Promise<Service> {
    return await this.servicesService.createService(createCategoryService);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza Datos del serivcio especificado',
    description: `Este endpoint toma los datos pasados por body y los usa para actualizar 
                  la informacion de un serivcio especifico pasado por el parametro ID `})
  @HttpCode(200)
  updateService(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryService: UpdateServiceDto): Promise<string> {
    return this.servicesService.updateService(id, updateCategoryService);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un serivcio pasado por ID',
    description: `Este endpoint elimina el serivcio pasado por el parametro ID`})
  @HttpCode(200)
  async removeService(@Param('id', ParseUUIDPipe) id: string) {
    return await this.servicesService.removeService(id);
  }
}
