/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { SendEmailDto } from '../email/dto/createEmail.dto';
import { EmailProvider } from '../email/email.provider';
import { UserRole } from '../users/entities/userRole.entity';
import { Role } from '../users/roles/roles.enum';
import { CreateUserWebDto } from '../users/dto/createUserWeb.dto';

@Injectable()
export class AuthGlobalService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailProvider: EmailProvider,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserWebDto): Promise<Omit<User, 'password' | 'role'>> {
    // Si tiene email, Compruebo que el email de usuario no este ya creado, sino devuelve un error   
    let userDB: User = await this.usersRepository.getUserByEmailRepository(user.email);
    if (userDB) throw new BadRequestException(`El usuario con el email ${userDB.email} ya existe`);

    // Comprobar que el DNI del usuario no este ya creado, sino devuelve un error
    userDB = await this.usersRepository.getUserByDniRepository(user.dni);
    if (userDB) throw new BadRequestException( `El usuario con el DNI ${userDB.dni} ya existe` );

    const passwordHash = await bcrypt.hash(user.password, 10);

    // quito passwordConfrim de user y lo guardo en createUser
    const { passwordConfirm, ...createUser } = user;

    // busco el role asignado, si no existe devuelvo error
    const userRole: UserRole = await this.usersRepository.getRolesUsersByRoleRepository(Role.User);
    if (!userRole) throw new NotFoundException('El rol Asignado no Existe');

    // creo el usuario en la DB pisando el dato del password con la clave hasheada 
    // y agregando la relacion role
    const userSave = await this.usersRepository.createUserRepository({
      ...createUser,
      roleId: userRole.id,
      password: passwordHash,
    });

    //envio email de bienvenida
    if (userSave.email) {
        const sendEmailWelcome: SendEmailDto = {
        to: userSave.email,
        subject: `¡Bienvenido ${userSave.name}! - NearVet`,
        html: `<H1>¡Bienvenido ${userSave.name}! - NearVet </H1>
              <p>Nos alegra que estes con nosotros. 
            Desde NearVet nuestra rpioridad es el cuidado de las mascotas! 
            deseamos que tengas una excelente experiencia con nosotros.</p>`,
        };
      this.emailProvider.sendEmail(sendEmailWelcome);
    }

    // quito el password y el role del userSave y lo guardo en sendUser para retornarlo
    const { password, role, ...sendUser } = userSave;
    return sendUser;
  }

  async signin(userLogin: LoginUserDto): Promise<Omit<User, 'password'> & { token: string }> {
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
      dni: userDB.dni,
      roles: userDB.role.role,
    };

    // creo el token, quito el password de userDB y lo guardo en sendUser y retorno el user con el token
    const token = this.jwtService.sign(userPayload);
    const { password, ...sendUser } = userDB;
    return { ...sendUser, token: token };
  }

  async signupGoogle(user: Partial<User>): Promise<Omit<User, 'password'> & { token: string }>{
    // Si tiene email, Compruebo que el email de usuario no este ya creado, sino devuelve un error   
    let userDB: User = await this.usersRepository.getUserByEmailRepository(user.email);
    if (!userDB) {
          const  passwordDefault= "Nearvet@"+Math.floor(1000 + Math.random() * 9000).toString();  
          const passwordHash = await bcrypt.hash(passwordDefault, 10);
      
          // busco el role asignado, si no existe devuelvo error
          const userRole: UserRole = await this.usersRepository.getRolesUsersByRoleRepository(Role.User);
          if (!userRole) throw new NotFoundException('El rol Asignado no Existe');
      
          // creo el usuario en la DB pisando el dato del password con la clave hasheada 
          // y agregando la relacion role
          userDB = await this.usersRepository.createUserRepository({
            ...user,
            roleId: userRole.id,
            password: passwordHash,
          });
          userDB = await this.usersRepository.getUserByEmailRepository(userDB.email);
      
          //envio email de bienvenida
          if (userDB.email) {
              const sendEmailWelcome: SendEmailDto = {
              to: userDB.email,
              subject: `¡Bienvenido ${userDB.name}! - NearVet`,
              html: `<H1>¡Bienvenido ${userDB.name}! - NearVet </H1>
                    <p>Nos alegra que estes con nosotros. 
                  Desde NearVet nuestra rpioridad es el cuidado de las mascotas! 
                  deseamos que tengas una excelente experiencia con nosotros.</p>
                  <h3> Estos son tus datos para iniciar sesion: (NO LOS COMPARTAS CON NADIE) </h3>
                  <h4> email: ${userDB.email} </h4>
                  <h4> password: ${passwordDefault} </h4>
                  <p> ATENCION: Te recomendamos ingresar a tu cuenta y completar tus datos de registro,
                  especialmente ingresar el cambio de password</p>`,

              };
            this.emailProvider.sendEmail(sendEmailWelcome);
          }
    }
    //creo el Payload a guardar en el token, con id, email, y los roles asignados al usuario
    const userPayload = {
      id: userDB.id,
      email: userDB.email,
      dni: userDB.dni,
      roles: userDB.role.role,
    };

    // creo el token, quito el password de userDB y lo guardo en sendUser y retorno el user con el token
    const token = this.jwtService.sign(userPayload);
    const { password, ...sendUser } = userDB;
    return { ...sendUser, token: token };
  }


}
