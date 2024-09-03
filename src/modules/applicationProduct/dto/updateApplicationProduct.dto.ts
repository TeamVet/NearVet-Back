import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationProductDto {
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description:"La cantidad del producto usado para el tratamiento",
        example:3
    })
    acount?: number;
  
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description:"El precio del producto usado para el tratamiento",
        example:250
    })
    price?: number;
  
}
