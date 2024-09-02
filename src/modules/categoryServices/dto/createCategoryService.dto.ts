import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryServiceDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Es el nombre de la categoria del servicio. Es Obligatorio",
                  example: "Veterinaria"
    })
    categoryService: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description:"Es una descripcion de la categoria del servicio. Es Opcional",
                  example: "En esta Categoria encontraras todos los cuidados para tu mascota"
    })
    description?: string;  

    @IsString()
    @IsOptional()
    @ApiProperty({description:"Es la URL de la imagen de la categoria del servicio. Es Opcional",
                  example: "no-image.jpg"
    })
    image?: string;    
}
