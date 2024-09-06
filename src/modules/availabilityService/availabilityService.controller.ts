import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityServiceService } from './availabilityService.service';
import { CreateAvailabilityServiceDto } from './dto/create-availability-service.dto';
import { UpdateAvailabilityServiceDto } from './dto/update-availability-service.dto';

@Controller('availability-service')
export class AvailabilityServiceController {
  constructor(private readonly availabilityServiceService: AvailabilityServiceService) {}

  @Get(":serviceId")
  getAppointmetnService(@Param("serviceId") serviceId:string) {
    return ["10:00","10:30","11:00","11:30","12:00","12:30","16:00","16:30","17:00","17:30","18:00","18:30"];
  }


}
