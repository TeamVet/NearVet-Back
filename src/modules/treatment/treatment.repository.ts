import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Treatment } from "./entities/treatment.entity";
import { Between, DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class TreatmentRepository {

    constructor (@InjectRepository(Treatment) private treatmentRepository : Repository<Treatment> ) {}

    async getTreatments(page: number, limit: number): Promise<Treatment[]> {
        return await this.treatmentRepository.find({
          skip: (page - 1) * limit,
          take: limit,
          relations: {
            service: true,
            clinicalExamination: true,
          },
          select: {
            service: { id: true, service: true },
            clinicalExamination: {
              id: true,
              anamnesis: true,
              veterinarian: {
                id: true,
                licence: true,
                user: {
                  id: true,
                  name: true,
                  lastName: true,
                },
              },
            },
          },
        });
      }

    async getTreatmentById (id:string): Promise<Treatment>  {
        return await this.treatmentRepository.findOne({
            where: {id}, 
            relations: {service: true, clinicalExamination: {veterinarian: {user:true}}},
           });
    }

    async getSaleIdByTreatmentId (id:string): Promise<string>  {
        const sale = await this.treatmentRepository.findOne({
            where: {id}, 
            relations: {clinicalExamination: true} });
        return sale.clinicalExamination.saleId
    }

    async getTreatmentsByService(serviceId: string, page: number, limit: number): Promise<Treatment[]> {
    return await this.treatmentRepository.find({
      where: { serviceId },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        service: true,
        clinicalExamination: true,
      },
      select: {
        service: { id: true, service: true },
        clinicalExamination: {
          id: true,
          anamnesis: true,
          veterinarian: {
            id: true,
            licence: true,
            user: {
              id: true,
              name: true,
              lastName: true,
            },
          },
        },
      },
    });
  }

    // async getTreatmentsByTypeService (typeServiceId: string): Promise<Treatment[]>  {
    //     return await this.treatmentRepository.find({
    //         where: {typeServiceId}, 
    //         relations: {service: true, typeService:true, clinicalExamination: true},
    //         select: {service: {id:true, service:true},
    //                 typeService: {id:true, typeService:true},
    //                 clinicalExamination: {id:true, anamnesis:true, veterinarian: 
    //                                     {id:true, licence:true, user: 
    //                                         {id:true, name:true, lastName:true}}}}});
    // }

    // async getTreatmentsByDates (startDate: Date, endDate: Date): Promise<Treatment[]>  {
    //     return await this.treatmentRepository.find({
    //         where: {date: Between(startDate,endDate)}, 
    //         relations: ["service", "typeService", "clinicalExamination"],
    //         select: {service: {id:true, service:true},
    //                 typeService: {id:true, typeService:true},
    //                 clinicalExamination: {id:true, anamnesis:true, veterinarian: 
    //                                     {id:true, licence:true, user: 
    //                                         {id:true, name:true, lastName:true}}, pet: {id:true, name:true}}}});
    // }

    async getTreatmentsByPet(petId: string, page: number, limit: number): Promise<Treatment[]> {
        return await this.treatmentRepository.find({
          where: { clinicalExamination: { petId } },
          skip: (page - 1) * limit,
          take: limit,
          relations: {
            service: true,
            clinicalExamination: { veterinarian: { user: true } },
            applicationProducts: { product: true },
          },
        });
      }

    async createTreatment (treatment: Partial<Treatment>): Promise<Treatment> {
        return await this.treatmentRepository.save(treatment);
    }

    async updateTreatment (id: string , treatment: Partial<Treatment>): Promise<UpdateResult> {
        return await this.treatmentRepository.update(id, treatment);
    } 

    async removeTreatment (id: string): Promise<DeleteResult> {
        return await this.treatmentRepository.delete(id);
    } 

}