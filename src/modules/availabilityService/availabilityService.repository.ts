import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailabilityService } from './entities/availability-service.entity';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';


@Injectable()
export class AvailabilityServiceRepository {

    constructor (
        @InjectRepository(AvailabilityService) private availabilityRepository: Repository<AvailabilityService>,
        @InjectRepository(Service) private serviceRepository: Repository<Service>,
    ){}    
    async getAvailabilityHoursByServiceAndDate (serviceId:string, date:Date): Promise<string[]> {
        const serviceDuration = await this.serviceRepository.findOne({ 
            where: {id: serviceId},
            select: ["durationMin"]
        })
        const availabilityAppoint = await this.availabilityRepository.find({where: {serviceId}})
        const dayAppoint = date.getDay();
        const objectWithDayThree = availabilityAppoint.find(dayAvail => dayAvail.day === dayAppoint);
        return [];
    }
}