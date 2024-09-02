import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { CreateApplicationProductDto } from './dto/createApplicationProduct.dto';
import { UpdateApplicationProductDto } from './dto/updateApplicationProduct.dto';
 
@Controller('application-product')
export class ApplicationProductController {
  constructor(private readonly applicationProductService: ApplicationProductService) {}

}
