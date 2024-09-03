import { Injectable } from '@nestjs/common';
import { CreateSaleServiceDto } from './dto/create-sale-service.dto';
import { UpdateSaleServiceDto } from './dto/update-sale-service.dto';

@Injectable()
export class SaleServicesService {
  create(createSaleServiceDto: CreateSaleServiceDto) {
    return 'This action adds a new saleService';
  }

  findAll() {
    return `This action returns all saleServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleService`;
  }

  update(id: number, updateSaleServiceDto: UpdateSaleServiceDto) {
    return `This action updates a #${id} saleService`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleService`;
  }
}
