import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryProduct } from './entities/categoryProduct.entity';
import { CategoryProductsRepository } from './categoryProducts.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryProductsService {
 
  constructor (private categoryProductRepository: CategoryProductsRepository){}

  async getCategoryProducts(page:number, limit:number): Promise<CategoryProduct[]> {
    const categoriesFind: CategoryProduct[] = await this.categoryProductRepository.getCategoryProducts(page, limit);
    if (categoriesFind.length===0) throw new NotFoundException("No se encontraron categorias de productos");
    return categoriesFind;
  }

  async getCategoryProductById(id: string): Promise<CategoryProduct> {
    const categoriesFind: CategoryProduct = await this.categoryProductRepository.getCategoryProductById(id);
    if (!categoriesFind) throw new NotFoundException("No se encontraro la categorias de productos buscada");
    return categoriesFind;
  }

  async getCategoryProductByCategory(category: string): Promise<CategoryProduct> {
    const categoriesFind: CategoryProduct = await this.categoryProductRepository.getCategoryProductByCategory(category);
    if (!categoriesFind) throw new NotFoundException("No se encontraro la categorias de productos buscada");
    return categoriesFind;
  }

  async createCategoryProduct(category: Partial<CategoryProduct>): Promise<CategoryProduct> {
    const categoriesCreated: CategoryProduct = await this.categoryProductRepository.createCategoryProduct(category);
    if (!categoriesCreated) throw new InternalServerErrorException("No se pudo crear la categoria");
    return categoriesCreated;
  }
    
  async updateCategoryProduct(id: string, category: Partial<CategoryProduct>): Promise<string> {
    const categoriesUpdated: UpdateResult = await this.categoryProductRepository.updateCategoryProduct(id, category)
    if (categoriesUpdated.affected===0) throw new NotFoundException("No se encontro la categoria a actualizar");
    return id; 
  } 

  async removeCategoryProduct(id: string): Promise<string> {
    const categoriesDeleted: DeleteResult = await this.categoryProductRepository.removeCategoryProduct(id)
    if (categoriesDeleted.affected===0) throw new NotFoundException("No se encontro la categoria a eliminar");
    return id;
  }

}
