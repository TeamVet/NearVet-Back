import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateApplicationProductDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description:"El id del tratamiento que usa el producto. Requerido",
        example: "asd678asd-asd78-87das-98ada-asd788asd"
    })
    treatmentId:string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description:"El id del producto que se usa en el tratamiento. Requerido",
        example: "asd678asd-asd78-87das-98ada-asd788asd"
    })
    productId:string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description:"Cantidad del producto. Requerido",
        example: 2
    })
    acount: number = 1;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description:"Precio individual del producto. Requerido",
        example: 200
    })
    price: number;
}
