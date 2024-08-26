import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Pet } from '../pets/entities/pet.entity';
import * as bcrypt from 'bcrypt';
import { Sex } from '../pets/entities/sex.entity';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly rolesRepository: Repository<UserRole>,
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    @InjectRepository(Sex)
    private readonly sexRepository: Repository<Sex>,
    /* @InjectRepository(Veterinaries)
    private readonly veterinariesRepository: Repository<Veterinaries>, */
  ) {}

  petsPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'src',
    'seeds',
    'pets.json',
  );
  petsdata = JSON.parse(fs.readFileSync(this.petsPath, 'utf8'));

  sexPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'sex.json');
  sexdata = JSON.parse(fs.readFileSync(this.sexPath, 'utf8'));

  rolesPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'src',
    'seeds',
    'roles.json',
  );
  rolesdata = JSON.parse(fs.readFileSync(this.rolesPath, 'utf8'));

  usersPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'src',
    'seeds',
    'users.json',
  );
  usersdata = JSON.parse(fs.readFileSync(this.usersPath, 'utf8'));

  veterinariesPath = path.join(
    __dirname,
    '..',
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
    //await this.petsRepository.delete({});
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
  async loadUsersData() {
    for (const item of this.usersdata) {
      let user = await this.userRepository.findOne({
        where: { email: item.email },
      });
      if (!user) {
        const role = await this.rolesRepository.findOne({
          where: { role: item.role },
        });

        if (!role) {
          throw new Error(`Role with name ${item.role} not found`);
        }
        const passwordHash = await bcrypt.hash(item.password, 10);
        user = this.userRepository.create({
          name: item.name,
          lastName: item.lastName,
          email: item.email,
          password: passwordHash,
          birthDate: item.birthDate,
          startDate: item.startDate,
          phone: item.phone,
          address: item.address,
          role: role,
          city: item.password,
          imgProfile: item.imgProfile,
        });
        await this.userRepository.save(user);
      }
    }
    return { message: 'Seeder usuarios agregados' };
  }
  async loadRolesData() {
    for (const item of this.rolesdata) {
      let role = await this.rolesRepository.findOne({
        where: { role: item.role },
      });
      if (!role) {
        role = this.rolesRepository.create({ role: item.role });
        await this.rolesRepository.save(role);
      }
    }
    return { message: 'Seeder roles agregados' };
  }
  async loadPetsData() {
    for (const item of this.petsdata) {
      let pet = await this.petsRepository.findOne({
        where: { dni: item.dni }, // CAMBIAR POR ALGO UNICO DE LA MASCOTA
      });
      if (!pet) {
        const user = await this.userRepository.findOne({
          where: { email: item.emailOwner },
        });

        if (!user) {
          throw new Error(
            `Dueño de la mascota con email: ${item.emailOwner} no encontrado`,
          );
        }
        const { birthdate, color, dni, emailOwner, name, sex, race, specie } =
          item;
        const sexDB = await this.sexRepository.findOne({
          where: { sex: sex },
        });
        const date = new Date().toLocaleDateString();
        pet = this.petsRepository.create({
          birthdate,
          color,
          dni,
          emailOwner,
          name,
          race,
          sex: sexDB,
          specie,
          user,
          startDate: date,
        });
        await this.petsRepository.save(pet);
      }
    }
    return { message: 'Seeder mascotas agregados' };
  }

  async loadSexData() {
    for (const item of this.sexdata) {
      let sex = await this.sexRepository.findOne({
        where: { sex: item.sex },
      });
      if (!sex) {
        sex = this.sexRepository.create({ sex: item.sex });
        await this.sexRepository.save(sex);
      }
    }
    return { message: 'Seeder sexos agregados' };
  }

  async onModuleInit() {
    await this.loadRolesData();
    await this.loadSexData();
    await this.loadUsersData();
    await this.loadPetsData();
    //await this.loadVeterinariesData();
  }
}
