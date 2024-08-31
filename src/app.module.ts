import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthGlobalModule } from './modules/authGlobal/authGlobal.module';
import { EmailModule } from './modules/email/email.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CategoryServicesModule } from './modules/categoryServices/categoryServices.module';
import { ServicesModule } from './modules/services/services.module';
import { VeterinarianModule } from './modules/veterinarian/veterinarian.module';
import { VetsModule } from './modules/vets/vets.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),

    // modulo para generar los token
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    AuthGlobalModule,
    AppointmentModule,
    UsersModule,
    PetsModule,
    EmailModule,
    SeederModule,
    CategoryServicesModule,
    ServicesModule,
    VeterinarianModule,
    VetsModule
  ],

  controllers: [],
  providers: [CloudinaryConfig, CloudinaryService],
})
export class AppModule {}
