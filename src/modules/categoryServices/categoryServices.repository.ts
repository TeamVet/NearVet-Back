import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "./entities/categoryService.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryServiceRepository {
    constructor (@InjectRepository(CategoryService) private categoryServiceRepository: Repository<CategoryService>) {}

    async getCategoryServiceByCategory(category: string): Promise<CategoryService> {
        return await this.categoryServiceRepository.findOne({where: {categoryService: category}});
    }

    async createCategoryService(category: Partial<CategoryService>): Promise<CategoryService> {
        return await this.categoryServiceRepository.save(category);
    }
}