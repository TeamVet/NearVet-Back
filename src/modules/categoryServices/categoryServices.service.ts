import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/createCategoryService.dto';
import { UpdateCategoryServiceDto } from './dto/updateCategoryService.dto';
import preloadCatSer from  "../../seeds/categoryService.json"
import { CategoryServiceRepository } from './categoryServices.repository';
import { CategoryService } from './entities/categoryService.entity';

@Injectable()
export class CategoryServicesService {

  constructor (private readonly categoryServiceRepository: CategoryServiceRepository) {}
  
  create(createCategoryServiceDto: CreateCategoryServiceDto) {
    return 'This action adds a new categoryService';
  }

  findAll() {
    return `This action returns all categoryServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryService`;
  }

  update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return `This action updates a #${id} categoryService`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryService`;
  }

  async preloadCategoryService(): Promise<void> {
    for (const category of preloadCatSer) {
      const {categoryService, description, image} = category;
      const categoryExist: CategoryService = await this.categoryServiceRepository.getCategoryServiceByCategory(categoryService);
      if (!categoryExist) {await this.categoryServiceRepository.createCategoryService(category); }
    }
    console.log("Articulos Cargados Con Exito")
  }
}
