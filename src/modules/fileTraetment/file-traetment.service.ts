import { Injectable } from '@nestjs/common';
import { CreateFileTraetmentDto } from './dto/create-file-traetment.dto';
import { UpdateFileTraetmentDto } from './dto/update-file-traetment.dto';

@Injectable()
export class FileTraetmentService {
  create(createFileTraetmentDto: CreateFileTraetmentDto) {
    return 'This action adds a new fileTraetment';
  }

  findAll() {
    return `This action returns all fileTraetment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileTraetment`;
  }

  update(id: number, updateFileTraetmentDto: UpdateFileTraetmentDto) {
    return `This action updates a #${id} fileTraetment`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileTraetment`;
  }
}
