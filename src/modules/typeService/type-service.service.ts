import { Injectable } from '@nestjs/common';
import { CreateTypeServiceDto } from './dto/create-type-service.dto';
import { UpdateTypeServiceDto } from './dto/update-type-service.dto';

@Injectable()
export class TypeServiceService {
  create(createTypeServiceDto: CreateTypeServiceDto) {
    return 'This action adds a new typeService';
  }

  findAll() {
    return `This action returns all typeService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeService`;
  }

  update(id: number, updateTypeServiceDto: UpdateTypeServiceDto) {
    return `This action updates a #${id} typeService`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeService`;
  }
}
