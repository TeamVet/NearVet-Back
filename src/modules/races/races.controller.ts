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
    getAllRaces() {
      return this.racesService.getAllRacesService();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Obtiene una raza por ID',
      description: 'Obtiene una raza específica utilizando su ID único',
    })
    getRaceById(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.getRaceByIdService(id);
    }
  
    @Post()
    @ApiOperation({
      summary: 'Crea una nueva raza',
      description: 'Crea una nueva raza en el sistema',
    })
    createRace(@Body() race: CreateRaceDto) {
      return this.racesService.createRaceService(race);
    }
  
    @Put(':id')
    @ApiOperation({
      summary: 'Actualiza una raza existente',
      description: 'Actualiza los datos de una raza utilizando su ID',
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
    deleteRace(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.deleteRaceService(id);
    }
  }
  