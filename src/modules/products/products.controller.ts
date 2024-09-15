import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  
  constructor(private readonly productsService: ProductsService) {}
 
  @Get()
  @ApiOperation({summary: "Devuelve todos los productos paginados",
          description: "Esta ruta devulve un array todos los productos existentes segun la paginacion ingresada"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontraron Productos"})
  @ApiQuery({ name: 'page', required: true, description:"Numero de pagina a retornar: (default: 1)"})
  @ApiQuery({ name: 'limit', required: true, description:"Cantidad maxima de productos por pagina: (default: 5)" })
  async getProducts (@Query("page") page:number=1, @Query("limit") limit:number=5): Promise<Product[]> {
    return await this.productsService.getProducts(+page, +limit) 
  }

  @Get("name/:name")
  @ApiOperation({summary: "Devuelve un producto pasado por Nombre",
    description: "Esta ruta devulve un producto pasado por Nombre"})
  @HttpCode(HttpStatus.FOUND)
  @ApiNotFoundResponse({description: "No existe el producto buscado"})
  @ApiParam({ name: 'name', required: true, description:"Inserte el nombre del Producto"})
  async getProductByName (@Param("name") name:string): Promise<Product> {
      return await this.productsService.getProductByName(name)
  }

  @Get(":id")
  @ApiOperation({summary: "Devuelve un producto pasado por ID",
    description: "Esta ruta devulve un producto pasado por ID"})
  @HttpCode(HttpStatus.FOUND)
  @ApiNotFoundResponse({description: "No existe el producto buscado"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el id del Producto (uuid)"})
  async getProductById (@Param("id", ParseUUIDPipe) id:string): Promise<Product> {
      return await this.productsService.getProductById(id)
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo Producto",
    description: "Esta ruta crea un nuevo producto con la informacion pasada por body y lo retorna"})
  @HttpCode(HttpStatus.CREATED)
  @ApiInternalServerErrorResponse({description: "No se pudo crear el producto"})
  @ApiBody({ description:"Ingrese los datos del nuevo producto", type:CreateProductDto})
  async createProduct (product: CreateProductDto): Promise<Product> {
      return await this.productsService.createProduct(product);
  }

  @Put(":id")
  @ApiOperation({summary: "Actualiza un producto",
    description: "Esta ruta actualiza un producto pasado por Id con la informacion pasada por body y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del producto"})
  @ApiBody({ description:"Ingrese los datos a actualizar", type:UpdateProductDto})
  async updateProduct (@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string>{
      return await this.productsService.updateProduct(id, product);
  }

  @Delete(":id")
  @ApiOperation({summary: "Elimina un producto",
    description: "Esta ruta elimina un producto pasado por Id y retorna el Id"})
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({description: "No se encontro el producto a actualizar"})
  @ApiParam({ name: 'id', required: true, description:"Inserte el Id del producto"})
  async removeProduct (id: string): Promise<string>{
      return await this.productsService.removeProduct(id);
  }

}
