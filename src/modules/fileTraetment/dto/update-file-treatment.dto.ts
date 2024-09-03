import { CreateFileTreatmentDto } from './create-file-treatment.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateFileTreatmentDto extends PickType(CreateFileTreatmentDto, ["description"]) {}
