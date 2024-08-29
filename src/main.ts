import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from 'cors';
import { BadRequestException, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { CategoryServicesService } from './modules/categoryServices/categoryServices.service';
import { VeterinarianService } from './modules/veterinarian/veterinarian.service';
import { ServicesService } from './modules/services/services.service';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from "./config/auth0"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(auth(auth0Config))
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist hace que solo se admitan las propiedades del DTO y ninguna adicional.
      whitelist: true,
      // setea la forma en la que voy a mostrar los errores de los DTO
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'Estos son los errores encontrados',
          errors: cleanErrors,
        });
      },
    }),
  );


      await app.get(CategoryServicesService).preloadCategoryService()
      await app.get(VeterinarianService).preloadVeterinarian()
      await app.get(ServicesService).preloadServices()


  //genero el Document Builder donde preconfiguro los datos basicos
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NearVet - Veterinarias siempre cerca de tu mascota')
    .setDescription(
      'Esta es una API REST para NearVet. Buscamos traer un beneficio tanto a las Veterinarias como a las mascotas de todos ofreciendo un servicio de interconexión',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  //creo el documento. le asigno la ruta "api"
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
