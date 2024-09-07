import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleServiceDto } from './dto/create-sale-service.dto';
import { UpdateSaleServiceDto } from './dto/update-sale-service.dto';
import { SaleService } from './entities/sale-service.entity';
import { SaleServiceRepository } from './sale-service.repository';

@Injectable()
export class SaleServiceService {
  constructor(private readonly saleServiceRepository: SaleServiceRepository) {}

  async getAllSaleServices() {
    const saleServices = await this.saleServiceRepository.getAllSaleServicesRepository();
    if (saleServices.length === 0) {
      throw new NotFoundException('Hasta el momento no hay servicios de venta registrados ...');
    }
    return {
      message: "Listado de servicios de venta registrados",
      saleServices
    };
  }

  async getSaleServiceById(id: string) {
    const saleService = await this.saleServiceRepository.getSaleServiceByIdRepository(id);
    if (!saleService) {
      throw new NotFoundException(`Servicio de venta con el ID ${id} no encontrado`);
    }
    return {
      message: `Servicio de venta con el ID ${id} encontrado exitosamente`,
      saleService
    };
  }

  async createSaleService(createSaleServiceDto: CreateSaleServiceDto): Promise<SaleService> {
    return await this.saleServiceRepository.createSaleServiceRepository(createSaleServiceDto);
  }

  async updateSaleService(id: string, updateSaleServiceDto: UpdateSaleServiceDto) {
    const saleService = await this.saleServiceRepository.updateSaleServiceRepository(id, updateSaleServiceDto);
    if (!saleService) {
      throw new NotFoundException(`Servicio de venta para modificar con el ID ${id} no encontrado`);
    }
    return {
      message: `Servicio de venta con el ID ${id} modificado exitosamente`,
      saleService
    };
  }

  async deleteSaleService(id: string) {
    const saleService = await this.saleServiceRepository.getSaleServiceByIdRepository(id);
    if (!saleService) {
      throw new NotFoundException(`Servicio de venta para eliminar con el ID ${id} no encontrado`);
    }
    await this.saleServiceRepository.deleteSaleServiceRepository(id);
    return {
      message: `Servicio de venta con el ID ${id} eliminado exitosamente`,
      saleService
    };
  }
}
