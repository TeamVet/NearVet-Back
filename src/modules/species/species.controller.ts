import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/createSpecie.dto';
import { UpdateSpeciesDto } from './dto/updateSpecie.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las especies',
    description: 'Obtiene todas las especies registradas hasta el momento',
  })
  @HttpCode(200)
  getAllSpecies() {
    return this.speciesService.getAllSpeciesService();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una especie por ID',
    description: 'Obtiene una especie específica utilizando su ID único',
  })
  getSpeciesById(@Param('id', ParseUUIDPipe) id: string) {
    return this.speciesService.getSpecieByIdService(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crea una nueva especie',
    description: 'Crea una nueva especie en el sistema',
  })
  createSpecies(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.createSpecieService(createSpeciesDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza una especie existente',
    description: 'Actualiza los datos de una especie utilizando su ID',
  })
  updateSpecies(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.updateSpecieService(id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una especie',
    description: 'Elimina una especie específica del sistema utilizando su ID',
  })
  deleteSpecies(@Param('id', ParseUUIDPipe) id: string) {
    return this.speciesService.deleteSpecieService(id);
  }
}
