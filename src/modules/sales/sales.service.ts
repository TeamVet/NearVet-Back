import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { Sale } from './entities/sale.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class SalesService {

  constructor (private readonly saleRepository: SalesRepository) {}

  async getSalesByDates (page:number, limit:number, start:Date, end:Date): Promise<Sale[]> {
    const sales: Sale[] = await this.saleRepository.getSalesByDates (page, limit, start, end);
    if (sales.length === 0 ) throw new NotFoundException("No se encontraron ventas en el periodo")
    return sales;
  }

  async getSaleById (id:string): Promise<Sale> {
    const sale: Sale = await this.saleRepository.getSaleById (id)
    if (!sale ) throw new NotFoundException("No se encontraro la venta")
    return sale;
  }

  async getSalesByUserId (page:number, limit:number, userId:string, start:Date, end:Date): Promise<Sale[]> {
    const sales: Sale[] = await this.saleRepository.getSalesByUserId (page, limit, userId, start, end);
    if (sales.length === 0 ) throw new NotFoundException("No se encontraron ventas del cliente en el periodo")
    return sales;
  }

  async getSalesSendClinical (): Promise<Sale[]> {
    const sales: Sale[] = await this.saleRepository.getSalesSendClinical ();
    if (sales.length === 0 ) throw new NotFoundException("No se encontraron ventas activas enviadas desde la clinica")
    return sales; 
  }

  async createSale (sale:Partial<Sale>): Promise<Sale> {
    const saleCreated: Sale = await this.saleRepository.createSale(sale);
    if (!saleCreated ) throw new InternalServerErrorException("No se pudo crear la venta")
    return saleCreated; 
  }

  async updateSale (id:string, sale:Partial<Sale>): Promise<string> {
    const saleUpdate: UpdateResult = await this.saleRepository.updateSale(id, sale);  
    if (saleUpdate.affected === 0) throw new NotFoundException("No se encontro la venta a actualizar")
    return id
  }

  async finishedSale (id:string): Promise<string> {
    const saleUpdate: UpdateResult = await this.saleRepository.finishedSale(id);  
    if (saleUpdate.affected === 0) throw new NotFoundException("No se encontro la venta")
    return id
  }

  async sendClinicalSale (id:string): Promise<string> {
    const saleUpdate: UpdateResult = await this.saleRepository.sendClinicalSale(id)   
    if (saleUpdate.affected === 0) throw new NotFoundException("No se encontro la venta")
    return id
  }

  async deleteSale (id:string): Promise<string> {
    const saleDelete: DeleteResult = await this.saleRepository.deleteSale(id)
    if (saleDelete.affected === 0) throw new NotFoundException("No se encontro la venta a eliminar")
    return id;
  }
}
