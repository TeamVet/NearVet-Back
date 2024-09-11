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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOperation, ApiTags, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ 
    summary: 'Devuelve todas las mascotas',
    description: `Devuelve un array con todas las mascotas registradas en la veterinaria`,
  })
  @ApiNotFoundResponse({ description: 'Por el momento no hay mascotas registradas' })
  @ApiResponse({ status: 200, description: 'Retorna un array de mascotas', type: [Pet] })
  @ApiBearerAuth()
  @HttpCode(200)
  getPets(): Promise<Pet[]> {
    return this.petsService.getPetsService();
  }

  @Get('SpecieAndRaces')
  @ApiOperation({ 
    summary: 'Devuelve todas las Especies con las razas asociadas',
    description: `Este endpoint retorna un array de objetos tipo Specie con id, specie, y races. Donde races es un array con todas las razas asociadas a esa especie conteniendo id y race por cada raza.`,
  })
  @ApiNotFoundResponse({ description: 'Por el momento no hay mascotas registradas' })
  @ApiResponse({ status: 200, description: 'Retorna un array de especies con sus razas asociadas', type: [Specie] })
  @HttpCode(200)
  getPetSpeciesandRaces(): Promise<Specie[]> {
    return this.petsService.getPetSpeciesandRacesService();
  }

  @Get('Species')
  @ApiOperation({ summary: 'Devuelve todas las especies de mascotas' })
  @ApiResponse({ status: 200, description: 'Retorna un array de especies', type: [Specie] })
  getPetSpecies(): Promise<Specie[]> {
    return this.petsService.getPetSpeciesService();
  }

  @Get('Races/:Specie')
  @ApiOperation({ summary: 'Devuelve todas las razas de una especie' })
  @ApiParam({ name: 'Specie', description: 'Nombre de la especie', type: 'string' })
  @ApiResponse({ status: 200, description: 'Retorna un array de razas', type: [Race] })
  getPetRaces(@Param('Specie') specie: string): Promise<Race[]> {
    return this.petsService.getPetRacesService(specie);
  }

  @Get('Sex')
  @ApiOperation({ summary: 'Devuelve todos los sexos de las mascotas' })
  @ApiResponse({ status: 200, description: 'Retorna un array de sexos', type: [Sex] })
  getPetSex(): Promise<Sex[]> {
    return this.petsService.getPetsSexService();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Retorna la mascota', type: Pet })
  getPetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Get('user/:id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User, Role.Veterinarian)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener todas las mascotas de un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Retorna un array de mascotas del usuario', type: [Pet] })
  getPetsByUser(@Param('id', ParseUUIDPipe) id: string): Promise<Pet[]> {
    return this.petsService.getPetsByUserService(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear una nueva mascota' })
  @ApiBody({ type: CreatePetDto, description: 'Datos de la mascota a crear' })
  @ApiResponse({ status: 201, description: 'Mascota creada exitosamente', type: Pet })
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.AdminVet, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar una mascota' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdatePetDto, description: 'Datos a actualizar de la mascota' })
  @ApiResponse({ status: 200, description: 'Mascota actualizada exitosamente', type: Pet })
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
  @ApiOperation({ summary: 'Eliminar una mascota' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Mascota eliminada exitosamente' })
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
}
