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
  import { RacesService } from './races.service';
  import {
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiTags,
    ApiParam,
    ApiBody,
  } from '@nestjs/swagger';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
  
  @ApiTags('Races')
  @Controller('races')
  export class RacesController {
    constructor(private readonly racesService: RacesService) {}
  
    @Get()
    @ApiOperation({
      summary: 'Obtiene todas las razas',
      description: 'Obtiene todas las razas registradas hasta el momento',
    })
    @HttpCode(200)
    @ApiInternalServerErrorResponse({
      description: 'Error al intentar obtener todas las razas',
    })
    getAllRaces() {
      return this.racesService.getAllRacesService();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Obtiene una raza por ID',
      description: 'Obtiene una raza específica utilizando su ID único',
    })
    @ApiParam({
      name: 'id',
      type: String,
      description: 'ID de la raza',
    })
    @ApiInternalServerErrorResponse({
      description: 'Error al intentar obtener la raza por ID',
    })
    getRaceById(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.getRaceByIdService(id);
    }
  
    @Post()
    @ApiOperation({
      summary: 'Crea una nueva raza',
      description: 'Crea una nueva raza en el sistema',
    })
    @ApiBody({
      type: CreateRaceDto,
      description: 'Datos para la creación de la nueva raza',
    })
    @ApiInternalServerErrorResponse({
      description: 'Error al intentar crear la raza',
    })
    createRace(@Body() race: CreateRaceDto) {
      return this.racesService.createRaceService(race);
    }
  
    @Put(':id')
    @ApiOperation({
      summary: 'Actualiza una raza existente',
      description: 'Actualiza los datos de una raza utilizando su ID',
    })
    @ApiParam({
      name: 'id',
      type: String,
      description: 'ID de la raza a actualizar',
    })
    @ApiBody({
      type: UpdateRaceDto,
      description: 'Datos para actualizar la raza',
    })
    @ApiInternalServerErrorResponse({
      description: 'Error al intentar actualizar la raza',
    })
    updateRace(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateRaceDto: UpdateRaceDto,
    ) {
      return this.racesService.updateRaceService(id, updateRaceDto);
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Elimina una raza',
      description: 'Elimina una raza específica del sistema utilizando su ID',
    })
    @ApiParam({
      name: 'id',
      type: String,
      description: 'ID de la raza a eliminar',
    })
    @ApiInternalServerErrorResponse({
      description: 'Error al intentar eliminar la raza',
    })
    deleteRace(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.deleteRaceService(id);
    }
  }
  