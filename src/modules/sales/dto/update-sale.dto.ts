import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateSaleDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    discount?: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    total?: number

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    date?: Date

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    advancedPay?: number

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional()
    userId?: string

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional()
    methodPayId?: string

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    finished?: boolean
}
 