import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMethodPayDto } from './dto/create-method-pay.dto';
import { UpdateMethodPayDto } from './dto/update-method-pay.dto';
import { MethodPayRepository } from './method-pay.repository';
import { MethodPay } from './entities/method-pay.entity';

@Injectable()
export class MethodPayService {
  constructor(private readonly methodPayRepository: MethodPayRepository) {}

  async getAllMethodPays() {
    const methodPay = await this.methodPayRepository.getAllMethodPaysRepository();
    if (methodPay.length === 0) {
      throw new NotFoundException('Hasta el momento no hay métodos de pago registrados ...');
    }
    return {
      message: "Listado de métodos de pago registrados",
      methodPay
    }
  }

  async getMethodPayById(id: string) {
    const methodPay = await this.methodPayRepository.getMethodPayByIdRepository(id);
    if (!methodPay) {
      throw new NotFoundException(`Metodo de pago con el ID ${id} no encontrado`);
    }
    return {
      message: `Metodo de pago con el ID ${id} encontrado exitosamente`,
      methodPay
    };
  }

  async createMethodPay(createMethodPayDto: CreateMethodPayDto): Promise<MethodPay> {
    return await this.methodPayRepository.createMethodPayRepository(createMethodPayDto);
  }

  async updateMethodPay(id: string, updateMethodPayDto: UpdateMethodPayDto) {
    const methodPay = await this.methodPayRepository.updateMethodPayRepository(id, updateMethodPayDto);
    if (!methodPay) {
      throw new NotFoundException(`Metodo de pago para modificar con el ID ${id} no encontrado`);
    }
    return {
      message: `Metodo de pago con el ID ${id} modificado exitosamente`,
      methodPay
    };
  }

  async deleteMethodPay(id: string) {
    const methodPay = await this.methodPayRepository.getMethodPayByIdRepository(id);
    if (!methodPay) {
      throw new NotFoundException(`Metodo de pago para eliminar con el ID ${id} no encontrado`);
    }
    await this.methodPayRepository.deleteMethodPayRepository(id);
    return {
      message: `Metodo de pago con el ID ${id} eliminado exitosamente`,
      methodPay
    };
  }
}
