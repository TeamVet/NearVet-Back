import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProduct } from './entities/categoryProduct.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryProductsRepository {
    constructor (@InjectRepository(CategoryProduct) private categoryProductRepository: Repository<CategoryProduct>){}

    async getCategoryProducts(page:number, limit:number): Promise<CategoryProduct[]> {
        return await this.categoryProductRepository.find({skip: page*limit, take: limit});
    }

    async getCategoryProductById(id: string): Promise<CategoryProduct> {
        return await this.categoryProductRepository.findOne({where: {id}})
    }

    async getCategoryProductByCategory(category: string): Promise<CategoryProduct> {
        return await this.categoryProductRepository.findOne({where: {category}});
    }

    async createCategoryProduct(category: Partial<CategoryProduct>): Promise<CategoryProduct> {
        return await this.categoryProductRepository.save(category);
    }
      
    async updateCategoryProduct(id: string, category: Partial<CategoryProduct>): Promise<UpdateResult> {
        return await this.categoryProductRepository.update(id, category)
    } 
  
    async removeCategoryProduct(id: string): Promise<DeleteResult> {
        return await this.categoryProductRepository.delete(id)
    }

}
