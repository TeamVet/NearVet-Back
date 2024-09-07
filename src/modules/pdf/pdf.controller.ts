import { Controller } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Documents-PDF")
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}


}
