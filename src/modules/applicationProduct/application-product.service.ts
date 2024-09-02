import { Injectable } from '@nestjs/common';
import { CreateApplicationProductDto } from './dto/createApplicationProduct.dto';
import { UpdateApplicationProductDto } from './dto/updateApplicationProduct.dto';

@Injectable()
export class ApplicationProductService {
  create(createApplicationProductDto: CreateApplicationProductDto) {
    return 'This action adds a new applicationProduct';
  }

  findAll() {
    return `This action returns all applicationProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationProduct`;
  }

  update(id: number, updateApplicationProductDto: UpdateApplicationProductDto) {
    return `This action updates a #${id} applicationProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationProduct`;
  }
}
