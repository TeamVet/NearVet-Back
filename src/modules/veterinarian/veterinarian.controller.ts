import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { VeterinarianService } from './veterinarian.service';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { Veterinarian } from './entities/veterinarian.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Veterinarian")
@Controller('veterinarian')
export class VeterinarianController {
  constructor(private readonly veterinarianService: VeterinarianService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna todos los datos de todos los veterinarios',
    description: `Este endpoint devuelve un array con cada uno de los veterinarios que tiene la veterinaria.
                  En Caso de no haber ningun veterinario retorna un error informandolo`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "No hay ningun Veterinario cargado"})
  async getVeteriarian(): Promise<Veterinarian[]> {
    return await this.veterinarianService.getVeteriarian();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna todos los datos del veterinario requerido por ID',
    description: `Este endpoint devuelve un objeto con todos los datos del Veterinario 
                  que este relacionado al ID pasado por parametro`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "El Veterinario buscado no existe"})
  async getVeterinarianById(@Param('id', ParseUUIDPipe) id: string): Promise<Veterinarian> {
    return await this.veterinarianService.getVeterinarianById(id);
  }

  @Get('licence/:lic')
  @ApiOperation({
    summary: 'Retorna todos los datos del veterinario requerido por Licencia',
    description: `Este endpoint devuelve un objeto con todos los datos del Veterinario 
                  que este relacionado al numero de licencia pasado por parametro`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "El Veterinario buscado no existe"})
  async getVeterinarianByLicence(@Param('lic', ParseIntPipe) lic: number): Promise<Veterinarian> {
    return await this.veterinarianService.getVeterinarianByLicence(+lic);
  }
  
  @Post()
  @ApiOperation({
    summary: 'Registra datos especificos de un Veterinario',
    description: `Cuando se crea un usuario con rol de veterinario aqui se incluyen los datos adicionales 
                  que son particulares de un veterinario`})
  @ApiBody({ description: 'Ingesar los datos particulares del veterinario', type: CreateVeterinarianDto })
  @HttpCode(201)
  @ApiInternalServerErrorResponse({description: "La creacione del veterinario no pudo concretarse"})
  create(@Body() createVeterinarian: CreateVeterinarianDto):Promise<Veterinarian> {
    return this.veterinarianService.create(createVeterinarian);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza Datos de un Veterinario especifico',
    description: `Este endpoint toma los datos pasados por body y los usa para actualizar 
                  la informacion de un Veterinario especifico pasado por el parametro ID `})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "El Veterinario que intenta actualizar no existe"})
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVeterinarian: UpdateVeterinarianDto,): Promise<string> {
    return this.veterinarianService.update(id, updateVeterinarian);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un veterinario pasado por ID',
    description: `Este endpoint elimina al veterinario pasado por el parametro ID, si tiene relaciones 
                  activas en la empresa solo le dara de baja`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "El Veterinario que intenta eliminar no existe"})
  remove(@Param('id') id: string) {
    return this.veterinarianService.remove(id);
  }
 
}
