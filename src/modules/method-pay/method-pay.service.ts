import { Injectable } from '@nestjs/common';
import { CreateMethodPayDto } from './dto/create-method-pay.dto';
import { UpdateMethodPayDto } from './dto/update-method-pay.dto';

@Injectable()
export class MethodPayService {
  create(createMethodPayDto: CreateMethodPayDto) {
    return 'This action adds a new methodPay';
  }

  findAll() {
    return `This action returns all methodPay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} methodPay`;
  }

  update(id: number, updateMethodPayDto: UpdateMethodPayDto) {
    return `This action updates a #${id} methodPay`;
  }

  remove(id: number) {
    return `This action removes a #${id} methodPay`;
  }
}
