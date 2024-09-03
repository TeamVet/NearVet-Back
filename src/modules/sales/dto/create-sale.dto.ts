import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class CreateSaleDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    subtotal: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    discount: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    total: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    date: Date

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    advancedPay: number

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string
}
