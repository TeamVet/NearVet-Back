import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

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

  /* try { 
    await app.get(UsersService).preloadUsersSeed()
    
    await app.get(CategoryService).preloadCategoriesSeed()

    await app.get(ProductsService).preloadProductsSeed()
   } catch (e) {
    throw new InternalServerErrorException("Error al intentar hacer la precarga inicial de Datos");
  } */

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
