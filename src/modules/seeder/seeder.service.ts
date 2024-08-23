import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Pets } from '../pets/entities/pet.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    /* @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>, */
    @InjectRepository(Pets)
    private readonly petsRepository: Repository<Pets>,
    /* @InjectRepository(Veterinaries)
    private readonly veterinariesRepository: Repository<Veterinaries>, */
  ) {}

  petsPath = path.join(__dirname, '..', '..', 'src', 'seeds', 'pets.seed.json');
  petsdata = JSON.parse(fs.readFileSync(this.petsPath, 'utf8'));

  rolesPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'seeds',
    'roles.seed.json',
  );
  rolesdata = JSON.parse(fs.readFileSync(this.rolesPath, 'utf8'));

  usersPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'seeds',
    'users.seed.json',
  );
  usersdata = JSON.parse(fs.readFileSync(this.usersPath, 'utf8'));

  veterinariesPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'seeds',
    'veterinaries.seed.json',
  );
  veterinariesdata = JSON.parse(fs.readFileSync(this.veterinariesPath, 'utf8'));

  async resetData() {
    await this.userRepository.delete({});
    /* await this.rolesRepository.delete({});
    await this.veterinariesRepository.delete({}); */
    await this.petsRepository.delete({});
    return { message: 'Datos reiniciados exitosamente' };
  }

  /* async loadVeterinariesData() {
    for (const item of this.veterinariesdata) {
      let veterinarie = await this.veterinariesRepository.findOne({
        where: { CUIT: item.CUIT },
      });
      if (!veterinarie) {
        veterinarie = this.veterinariesRepository.create(item);
        await this.veterinariesRepository.save(veterinarie);
      }
    }
    return { message: 'Seeder veterinarios agregados' };
  } */
  /* async loadUsersData() {
    for (const item of this.usersdata) {
      let user = await this.userRepository.findOne({
        where: { email: item.email },
      });
      if (!user) {
        user = this.userRepository.create(item);
        await this.userRepository.save(user);
      }
    }
    return { message: 'Seeder usuarios agregados' };
  } */
  /* async loadRolesData() {
    for (const item of this.rolesdata) {
      let role = await this.rolesRepository.findOne({
        where: { role: item.role },
      });
      if (!role) {
        role = this.userRepository.create(item);
        await this.userRepository.save(role);
      }
    }
    return { message: 'Seeder roles agregados' };
  } */
  /* async loadPetsData() {
    for (const item of this.petsdata) {
      let pet = await this.petsRepository.findOne({
        where: { email: item.email }, // CAMBIAR POR ALGO UNICO DE LA MASCOTA
      });
      if (!pet) {
        pet = this.petsRepository.create(item);
        await this.petsRepository.save(pet);
      }
    }
    return { message: 'Seeder mascotas agregados' };
  } */

  async onModuleInit() {
    //await this.loadRolesData();
    //await this.loadUsersData();
    //await this.loadVeterinariesData();
    //await this.loadPetsData();
  }
}
