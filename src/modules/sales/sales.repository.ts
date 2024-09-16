import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalesRepository {

    constructor (@InjectRepository(Sale) private saleRepository: Repository<Sale>) {}

    async getSalesByDates (page:number, limit:number, start:Date, end:Date): Promise<Sale[]> {
        return await this.saleRepository.find({where: {date: Between(start,end)}, take: limit, skip:page*limit});
    }

    async getSales (): Promise<Sale[]> {
        return await this.saleRepository.find();
    }

    async getSaleById (id:string): Promise<Sale> {
        return await this.saleRepository.findOneBy({id});
    }

    async getSalesByUserId (page:number, limit:number, userId:string, start:Date, end:Date): Promise<Sale[]> {
        return await this.saleRepository.find({where: {userId, date: Between(start,end)}, take: limit, skip:page*limit});
    }

    async getSalesSendClinical (): Promise<Sale[]> {
        return await this.saleRepository.find({where: {sendClinical:true, finished:false}});
    }
 
    async createSale (sale:Partial<Sale>): Promise<Sale> {
        return await this.saleRepository.save(sale);
    }

    async updateSale (id:string, sale:Partial<Sale>): Promise<UpdateResult> {
        return await this.saleRepository.update(id, sale);
    }

    async finishedSale (id:string): Promise<UpdateResult> {
        return await this.saleRepository.update(id, {finished:true});
    }

    async sendClinicalSale (id:string): Promise<UpdateResult> {
        return await this.saleRepository.update(id, {sendClinical:true});
    }

    async deleteSale (id:string): Promise<DeleteResult> {
        return await this.saleRepository.delete(id);
    }
}
