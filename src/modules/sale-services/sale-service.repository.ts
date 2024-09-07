import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaleService } from "./entities/sale-service.entity";

@Injectable()
export class SaleServiceRepository {
  constructor(
    @InjectRepository(SaleService) private saleServiceRepository: Repository<SaleService>
  ) {}

  async getAllSaleServicesRepository() {
    return await this.saleServiceRepository.find();
  }

  async getSaleServiceByIdRepository(id: string) {
    return await this.saleServiceRepository.findOneBy({ id });
  }

  async createSaleServiceRepository(saleService: Partial<SaleService>) {
    return await this.saleServiceRepository.save(saleService);
  }

  async updateSaleServiceRepository(id: string, saleService: Partial<SaleService>) {
    await this.saleServiceRepository.update(id, saleService);
    return await this.saleServiceRepository.findOneBy({ id });
  }

  async deleteSaleServiceRepository(id: string) {
    await this.saleServiceRepository.delete(id);
  }
}
