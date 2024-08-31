import { Controller, Get, Post, Body, Param, Delete, HttpCode, ParseUUIDPipe, Put } from '@nestjs/common';
import { CategoryServicesService } from './categoryServices.service';
import { CreateCategoryServiceDto } from './dto/createCategoryService.dto';
import { UpdateCategoryServiceDto } from './dto/updateCategoryService.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './entities/categoryService.entity';

@ApiTags("Categories Services")
@Controller('category-services')
export class CategoryServicesController {
  constructor(private readonly categoryServicesService: CategoryServicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna todos los datos de todas las categorias de servicios',
    description: `Este endpoint devuelve un array con cada una de las categorias de servicios que tiene la veterinaria.
                  En Caso de no haber ninguna categorias de servicio retorna un error informandolo`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "No hay ninguna categorias de servicio cargada"})
  async getCategoryServices(): Promise<CategoryService[]> {
    return await this.categoryServicesService.getCategoryServices();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna todos los datos de la categoria de servicio requerida por ID',
    description: `Este endpoint devuelve un objeto con todos los datos de la categoria de servicio 
                  que este relacionada al ID pasado por parametro`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "La categoria de servicio buscada no existe"})
  async getCategoryServiceById(@Param('id', ParseUUIDPipe) id: string): Promise<CategoryService> {
    return await this.categoryServicesService.getCategoryServiceById(id);
  }

  @Get('category/:cat')
  @ApiOperation({
    summary: 'Retorna todos los datos de la categoria de servicio requerida por categoria',
    description: `Este endpoint devuelve un objeto con todos los datos de la categoria de servicio 
                  que este relacionada a la categoria pasado por parametro`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "La categoria de servicio buscada no existe"})
  async getCategoryServiceByCategory(@Param('cat') cat: string): Promise<CategoryService> {
    return await this.categoryServicesService.getCategoryServiceByCategory(cat);
  }
  
  @Post()
  @ApiOperation({
    summary: 'Registra una categoria de servicio nueva',
    description: `Aqui se ´pueden registrar las categorias de servicio que la veterniaria va a tener`})
  @ApiBody({ description: 'Ingesar los datos de la categoria de servicio', type: CreateCategoryServiceDto })
  @HttpCode(201)
  @ApiInternalServerErrorResponse({description: "La creacione de la categoria de servicio no pudo concretarse"})
  createCategoryService(@Body() createCategoryService: CreateCategoryServiceDto):Promise<CategoryService> {
    return this.categoryServicesService.createCategoryService(createCategoryService);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza Datos de una categoria de serivcio especifica',
    description: `Este endpoint toma los datos pasados por body y los usa para actualizar 
                  la informacion de una categoria de serivcio especifica pasado por el parametro ID `})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "La categoria de serivcio que intenta actualizar no existe"})
  updateCategoryService(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryService: UpdateCategoryServiceDto): Promise<string> {
    return this.categoryServicesService.updateCategoryService(id, updateCategoryService);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una categoria de serivcio pasado por ID',
    description: `Este endpoint elimina la categoria de serivcio pasada por el parametro ID, eliminara todos los servicios asociados`})
  @HttpCode(200)
  @ApiNotFoundResponse({description: "La categoria de serivcio que intenta eliminar no existe"})
  removeCategoryService(@Param('id') id: string) {
    return this.categoryServicesService.removeCategoryService(id);
  }
  
  
  @Post("preloadCategoryService")
  @ApiOperation({
    summary: 'Realiza la pracarga de Categorias de servicio',
    description: `Este endpoint realiza a precarga inicial de datos en la tabla Categoria de servicios`})
  preloadCategoryService() {
    return this.categoryServicesService.preloadCategoryService();
  }


}
