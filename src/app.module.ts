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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    // modulo para generar los token
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    AuthGlobalModule,
    UsersModule,
    PetsModule,
    EmailModule,
    SeederModule,
  ],

  controllers: [],
  providers: [CloudinaryConfig, CloudinaryService],
})
export class AppModule {}
