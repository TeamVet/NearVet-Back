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
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../authGlobal/guards/Auth.guard';
import { RolesGuard } from '../users/roles/roles.guard';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';
import { Sex } from './entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { Pet } from './entities/pet.entity';
import { Specie } from '../species/entities/specie.entity';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({summary: 'Devuelve todas las mascotas'})
  getPets(@Query("page") page:number, @Query("limit") limit:number): Promise<Pet[]> {
    return this.petsService.getPetsService(+page, +limit);
  }

  @Get('SpecieAndRaces')
  @ApiOperation({ summary: 'Devuelve todas las Especies con las razas asociadas'})
  getPetSpeciesandRaces(): Promise<Specie[]> {
    return this.petsService.getPetSpeciesandRacesService();
  }

  @Get('Species')
  @ApiOperation({ summary: 'Devuelve todas las especies de mascotas' })
  getPetSpecies(): Promise<Specie[]> {
    return this.petsService.getPetSpeciesService();
  }

  @Get('Races/:Specie')
  @ApiOperation({ summary: 'Devuelve todas las razas de una especie' })
  getPetRaces(@Param('Specie') specie: string): Promise<Race[]> {
    return this.petsService.getPetRacesService(specie);
  }

  @Get('Sex')
  @ApiOperation({ summary: 'Devuelve todos los sexos de las mascotas' })
  getPetSex(): Promise<Sex[]> {
    return this.petsService.getPetsSexService();
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User, Role.Veterinarian)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener todas las mascotas de un usuario' })
  getPetsByUser(@Param('id', ParseUUIDPipe) id: string): Promise<Pet[]> {
    return this.petsService.getPetsByUserService(id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  getPetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear una nueva mascota' })
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar una mascota' })
  removePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.removePetService(id);
  }

  @Put('imgProfile/:id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen de perfil de la mascota' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string', format: 'uuid' })
  @ApiBody({
    description: `Debe subir el archivo de imagen`,
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
  @ApiResponse({ status: 200, description: 'Imagen de perfil subida exitosamente' })
  async uploadImgProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 30000000,
            message: 'El Archivo debe ser menor a 30Mb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.petsService.uploadImgProfileService(id, file);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar una mascota' })
  @ApiBody({ type: UpdatePetDto, description: 'Datos a actualizar de la mascota' })
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.updatePetService(id, updatePetDto);
  }
  
}
