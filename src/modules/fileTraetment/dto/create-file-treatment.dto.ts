import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateFileTreatmentDto {
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "URL del archivo. Requerido",
        example: "archivo.pdf"
    })
    image?: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: "Id del tratamiento al cual pertenece el archivo",
        example: "asd678asd-as56-hjk78-345ty-asd456sd"
    })
    treatmentId:string
}
