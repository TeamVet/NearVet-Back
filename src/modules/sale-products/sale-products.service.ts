import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SaleProductsRepository } from './sale-products.repository';
import { SaleProduct } from './entities/sale-product.entity';

@Injectable()
export class SaleProductsService {
 
  constructor (private readonly saleProductRepository: SaleProductsRepository) {}

  async getSalesProductBySaleId (saleId:string): Promise<SaleProduct[]> {
    return await this.saleProductRepository.getSalesProductBySaleId(saleId)
  }

  async createSalesProduct (saleProduct: Partial<SaleProduct>): Promise<SaleProduct> {
    const saleProductCreated: SaleProduct = await this.saleProductRepository.createSalesProduct(saleProduct)
    if (!saleProductCreated) throw new InternalServerErrorException("No se pudo agregar el Producto a la venta")
    return saleProductCreated
  }

  async updateSalesProduct (saleId:string, productId:string, saleProduct: Partial<SaleProduct>): Promise<string[]> {
    const saleProductUpdate: UpdateResult = await this.saleProductRepository.updateSalesProduct(saleId, productId, saleProduct)
    if (saleProductUpdate.affected === 0) throw new NotFoundException("No se encontro el Producto a actualizar")
    return [saleId, productId]
  }

  async deleteSalesProduct (saleId:string, productId:string): Promise<string[]> {
    const saleProductDelete: DeleteResult = await this.saleProductRepository.deleteSalesProduct(saleId, productId)
    if (saleProductDelete.affected === 0) throw new NotFoundException("No se encontro el Producto a eliminar")
    return [saleId, productId]
  }

}
