import { Injectable, NotFoundException } from '@nestjs/common';
import { RaceRepository } from './races.repository';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RacesService {
  constructor(private readonly raceRepository: RaceRepository) {}

  async getAllRacesService() {
    const races = await this.raceRepository.getAllRacesRepository();
    if (races.length === 0) {
        throw new NotFoundException('Hasta el momento no hay razas registradas ...');
      }
      return {
        message: "Listado de razas registradas",
        races
      }
  }

  async getRaceByIdService(id: string) {
    const race = await this.raceRepository.getRaceByIdRepository(id);
    if (!race) {
      throw new NotFoundException(`Raza para buscar con el ID ${id} no encontrada`);
    }
    return {
        message: `Raza con el ID ${id} encontrada exitosamente`,
        race
      };
  }

  async createRaceService(race: CreateRaceDto) {
    return await this.raceRepository.createRaceRepository(race);
  }

  async updateRaceService(id: string, updateRaceDto: UpdateRaceDto) {
    const updatedRace = await this.raceRepository.updateRaceRepository(id, updateRaceDto);
    if (!updatedRace) {
      throw new NotFoundException(`Raza para modificar con el ID ${id} no encontrada`);
    }
    return {
        message: `Raza con el ID ${id} modificada exitosamente`,
        updatedRace
      };
  }

  async deleteRaceService(id: string) {
    const race = await this.raceRepository.getRaceByIdRepository(id);
    if (!race) {
      throw new NotFoundException(`Raza para eliminar con el ID ${id} no encontrada`);
    }
    await this.raceRepository.deleteRaceRepository(id);
    return {
        message: `Raza con el ID ${id} eliminada exitosamente`,
        race
      };
  }
}
