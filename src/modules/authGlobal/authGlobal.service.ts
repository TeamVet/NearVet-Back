/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { SendEmailDto } from '../email/dto/sendEmailUser.dto';
import { EmailProvider } from '../email/email.provider';
import { UserRole } from '../users/entities/userRole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGlobalService {
  constructor(
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    private readonly usersRepository: UsersRepository,
    private readonly emailProvider: EmailProvider,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Comprobar que el usuario no este ya creado, sino devuelve un error
    const userDB = await this.usersRepository.getUserByEmailRepository(
      user.email,
    );
    if (userDB) throw new BadRequestException('Este usuario ya ha sido creado');

    // Si el paso anterior esta bien, compruebo que las contraseñas sean iguales
    if (user.password !== user.passwordConfirm)
      throw new BadRequestException(
        'La contraseña y la confirmacion no coinciden',
      );

    // hasheo la contraseña
    const passwordHash = await bcrypt.hash(user.password, 10);
    // quito passwordConfrim de user y lo guardo en createUser
    const { passwordConfirm, role, ...createUser } = user;
    // creo el usuario en la DB pisando el dato del password con la clave hasheada
    const userRole: UserRole = await this.userRoleRepository.findOneBy({role:user.role})
    if (!userRole) new NotFoundException("El rol Asignado no Existe");
    const userSave = await this.usersRepository.createUserRepository({
      ...createUser,
      userRole,
      password: passwordHash,
    });
    //envio email de bienvenida
    if (userSave.email) {
    const sendEmailWelcome: SendEmailDto = {
      to: userSave.email,
      subject: `¡Bienvenido ${userSave.name}! - NearVet`,
      text: `¡Bienvenido ${userSave.name}!
            Nos alegra que estes con nosotros. 
            Desde NearVet nuestra rpioridad es el cuidado de las mascotas! 
            deseamos que tengas una excelente experiencia con nosotros.`,
      html: `<HTML><BODY><H1>¡Bienvenido ${userSave.name}! - NearVet </H1>`,
    };
    this.emailProvider.sendEmail(sendEmailWelcome);
  }
    // quito el password del userSave y lo guardo en sendUser para retornar
    const {password, ...sendUser} = userSave
    return sendUser;
  }



  async signin( userLogin: LoginUserDto,): Promise<Omit<User, 'password'> & { token: string }> {
    // comprueba que el usuario exista, sino devuelve un error
    const userDB = await this.usersRepository.getUserByDniRepository(
      userLogin.dni,
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
      roles: userDB.userRole,
    };

    // creo el token, quito el password de userDB y lo guardo en sendUser y retorno el user con el token
    const token = this.jwtService.sign(userPayload);
    const { password, ...sendUser } = userDB;
    return { ...sendUser, token: token };
  }

}
