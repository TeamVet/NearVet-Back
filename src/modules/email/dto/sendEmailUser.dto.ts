import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quienes son los que recibiran este Email',
    example: 'eze.g.alonso@gmail.com',
  })
  to: string; // El destinatario del correo electrónico

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Cual es el asunto de este email',
    example: 'Bienvenido a NearVet - Tu mascota, nuestra Prioridad',
  })
  subject: string; // El asunto del correo electrónico

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido en texto para el mail',
    example: 'queriamos darte la bienvenida a nuestra app. Que seas muy feliz!',
  })
  text: string; // El cuerpo del correo en texto plano

  @IsString()
  @ApiPropertyOptional({
    description: 'Contenido en HTML para el mail',
    example:
      '<HTML><BODY><H1>Hola Ezequiel Gracias por elegirnos</H1></BODY> </HTML>',
  })
  html?: string; // El cuerpo del correo en formato HTML (opcional)
}
