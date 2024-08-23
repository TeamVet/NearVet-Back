/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Users } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/loginUser.dto';

@Injectable()
export class AuthGlobalService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<Omit<Users, 'password'>> {
    // Comprobar que el usuario no este ya creado, sino devuelve un error
    const userDB = await this.usersRepository.getUserByEmailRepository(
      user.email,
    );
    if (userDB) throw new BadRequestException('Este usuario ya ha sido creado');

    // Si el paso anterior esta bien, compruebo que las contraseñas sean iguales
    if (user.password !== user.passwordConfirm)
      throw new BadRequestException(
        'La contraseña y la confirmacion no cohinciden',
      );

    // hasheo la contraseña
    const passwordHash = await bcrypt.hash(user.password, 10);
    // quito passwordConfrim de user y lo guardo en createUser
    const { passwordConfirm, ...createUser } = user;
    // creo el usuario en la DB pisando el dato del password con la clave hasheada
    const userSave = await this.usersRepository.createUserRepository({
      ...createUser,
      password: passwordHash,
    });
    // quito el password del userSave y lo guardo en sendUser para retornar
    const { ...sendUser } = userSave;
    return sendUser;
  }

  async signin(
    userLogin: LoginUserDto,
  ): Promise<Partial<Users> & { token: string }> {
    // comprueba que el usuario exista, sino devuelve un error
    const userDB = await this.usersRepository.getUserByEmailRepository(
      userLogin.email,
    );
    if (!userDB) {
      throw new BadRequestException('Usuario o Clave incorrectos');
    }

    // comprueba que la clave sea correcta, sino devuelve un error
    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      userDB.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Usuario o Clave incorrectos');
    }

    //creo el Payload a guardar en el token, con id, email, y los roles asignados al usuario
    const userPayload = {
      id: userDB.id,
      email: userDB.email,
      //roles: userDB.userRoles.map((role) => role.role),
    };

    // creo el token, quito el password de userDB y lo guardo en sendUser y retorno el user con el token
    const token = this.jwtService.sign(userPayload);
    const { password, ...sendUser } = userDB;
    return { ...sendUser, token: token };
  }
}
