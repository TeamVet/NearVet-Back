import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTreatmentDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description:"Describe el tratamiento a realizar. Es Obligatoria. ", 
                   example: "Se aplicara una desinfeccion con antibioticos y se procedera a hacer una costura." })
    description: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description:"Indica algo extre que el profecional quiera dejar registrado. Es opcional", 
                           example: "Algo importante de lo que se deba dejar constancia." })
    observation?: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ description:"Es la fecha en la que comienza la aplicacion del tratamiento. Es Obligatorio", 
        example: "Se aplicara una desinfeccion con antibioticos y se procedera a hacer una costura." })
    Date: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description:"Es el precio final del servicio que se ofrece. Se ingresaautomaticamente cuando se ingresa el Servicio. Es Obligatorio", 
        example: 9000 })
    price: number;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description:"Es el ID del servicio que se esta brindando en el tratamiento. Es Obligatorio", 
        example: "asd3434-asd45-asdf5-dfg6-asdfsfhtrr6" })
    serviceId:string;

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({ description:"En caso de tenerlo, se puede indicar el tipo de servicio que se aplica o requiere. Es Opcional", 
        example: "asd3434-asd45-asdf5-dfg6-asdfsfhtrr6" })
    typeServiceId?:string
}
