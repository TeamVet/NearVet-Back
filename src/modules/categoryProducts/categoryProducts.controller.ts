import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, Query, Put } from '@nestjs/common';
import { CategoryProductsService } from './categoryProducts.service';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateCategoryProductDto } from './dto/update-category-product.dto';
import { CategoryProduct } from './entities/categoryProduct.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Categories Products")
@Controller('category-products')
export class CategoryProductsController {
  constructor(private readonly categoryProductsService: CategoryProductsService) {}
 
  @Get()
  @ApiOperation({
    summary: 'Devuelve todas las categorias de servicios',
    description: `Este endpoint devuelve un array con todas las categorias de productos `})
  @HttpCode(HttpStatus.FOUND)
  @ApiNotFoundResponse({description: "No se encontro ninguna categoria de producto"})
  async getCategoryProducts(@Query("page") page:number=1, @Query("limit") limit:number=5): Promise<CategoryProduct[]> {
    return await this.categoryProductsService.getCategoryProducts(+page, +limit);
  }

  @Get(":id")
  @ApiOperation({
    summary: 'devuleve la categoria de producto pasada por ID',
    description: `Este endpoint devuelve la categoria de producto pasada por ID `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"id", required:true, description:"Ingrese el Id de la categoria"})
  @ApiNotFoundResponse({description: "No se encontro ninguna categoria de producto"})
  async getCategoryProductById(@Param("id", ParseUUIDPipe) id: string): Promise<CategoryProduct> {
      return await this.categoryProductsService.getCategoryProductById(id)
  }

  @Get("category/:category")
  @ApiOperation({
    summary: 'devuleve la categoria de producto pasada por nombre de la categoria',
    description: `Este endpoint devuelve la categoria de producto pasada por nombre de la categoria `})
  @HttpCode(HttpStatus.FOUND)
  @ApiParam({name:"category", required:true, description:"Ingrese el nombre de la categoria"})
  @ApiNotFoundResponse({description: "No se encontro ninguna categoria de producto"})
  async getCategoryProductByCategory(@Param("category") category: string): Promise<CategoryProduct> {
      return await this.categoryProductsService.getCategoryProductByCategory(category);
  }

  @Post()
  @ApiOperation({summary: "Crea una nueva Categoria de Producto",
    description: "Esta ruta crea una nueva categoria de producto con la informacion pasada por body y lo retorna"})
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({description: "No se pudo crear la categoria de producto"})
  @ApiBody({ description:"Ingrese los datos de la nueva categoria de producto", type:CreateCategoryProductDto})
  async createCategoryProduct(@Body() category: CreateCategoryProductDto): Promise<CategoryProduct> {
      return await this.categoryProductsService.createCategoryProduct(category);
  }

  @Put(":id")
  @ApiOperation({summary: "Actualiza una categoria de  producto",
    description: "Esta ruta actualiza una categoria de producto pasado por Id con la informacion pasada por body y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro la categoria de producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id de la categoria de producto"})
  @ApiBody({ description:"Ingrese los datos a actualizar", type:UpdateCategoryProductDto})
  async updateCategoryProduct(@Param("id", ParseUUIDPipe) id: string, @Body() category: UpdateCategoryProductDto): Promise<string> {
      return await this.categoryProductsService.updateCategoryProduct(id, category)
  }  

  @Delete(":id")
  @ApiOperation({summary: "Elimina una categoria de producto",
    description: "Esta ruta elimina una categoria de producto pasado por Id y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro la categoria de  producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id de la categoria de  producto"})
  async removeCategoryProduct(@Param("id", ParseUUIDPipe)id: string): Promise<string> {
      return await this.categoryProductsService.removeCategoryProduct(id)
  }
}
