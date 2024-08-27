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
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  getPets() {
    return this.petsService.getPetsService();
  }

  @Get(':id')
  getPetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetByIdService(id);
  }

  @Get('user/:id')
  getPetsByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.getPetsByUserService(id);
  }

  @Post()
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPetService(createPetDto);
  }

  @Put(':id')
  updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petsService.updatePetService(id, updatePetDto);
  }

  @Delete(':id')
  removePet(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.removePetService(id);
  }

  @Put('imgProfile/:id')
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
