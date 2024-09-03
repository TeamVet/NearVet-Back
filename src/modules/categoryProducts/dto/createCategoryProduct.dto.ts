import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryProductDto {

    
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Nombre de la categoria de producto. Es Obligatorio.",
    example:"Antibioticos"
  })
  category:string

}
