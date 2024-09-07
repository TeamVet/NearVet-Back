import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAvailabilityServiceDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    day: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    startHour1: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    endHour1: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    startHour2?: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()  
    endHour2?: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    serviceId: string;
}
