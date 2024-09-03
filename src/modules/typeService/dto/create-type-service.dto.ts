
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTypeServiceDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    typeService:string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    serviceId: string
}
