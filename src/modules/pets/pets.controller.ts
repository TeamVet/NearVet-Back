import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../authGlobal/guards/Auth.guard';
import { RolesGuard } from '../users/roles/roles.guard';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';
import { Specie } from './entities/specie.entity';
import { Sex } from './entities/sex.entity';
import { Race } from './entities/race.entity';
import { Pet } from './entities/pet.entity';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'Devuelve todas las mascotas',
                  description: `Devuelve un array con todas las mascotas registradas en la veterinaria`,})
  @ApiNotFoundResponse({ description:"Por el momento no hay mascotas registradas"})
  @HttpCode(200)
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getPets(): Promise<Pet[]> {
    return this.petsService.getPetsService();
  }

  @Get("SpecieAndRaces")
  @ApiOperation({ summary: 'Devuelve todas las Especies con las razas asociadas',
                  description: `Este endpiont retorna una array de objetos tipo Specie con id, Specie, y Races.
                                Donde Races es un array con todas las razas asociadas a esa especie
                                conteniendo id y race por cada raza`,})
  @ApiNotFoundResponse({ description:"Por el momento no hay mascotas registradas"})
  @HttpCode(200)
  getPetSpeciesandRaces(): Promise <Specie[]> {
    return this.petsService.getPetSpeciesandRacesService();
  }

  @Get("Species")
  getPetSpecies(): Promise <Specie[]> {
    return this.petsService.getPetSpeciesService();
  }

  @Get("Races/:Specie")
  getPetRaces(@Param("Specie") specie: string): Promise <Race[]> {
    return this.petsService.getPetRacesService(specie);
  }

  @Get("Sex")
  getPetSex(): Promise <Sex[]> {
    return this.petsService.getPetsSexService();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getPetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User, Role.Veterinarian)
  @UseGuards(AuthGuard, RolesGuard)
  getPetsByUser(@Param('id', ParseUUIDPipe) id: string): Promise<Pet[]> {
    return this.petsService.getPetsByUserService(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.updatePetService(id, updatePetDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  removePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.removePetService(id);
  }

  @Put('imgProfile/:id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `Debe subir el Archivo de Imagen`,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImgProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El Archivo debe ser menor a 200Kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('File', file);
    return await this.petsService.uploadImgProfileService(id, file);
  }
}
