import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Documents-PDF")
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

   @Get()
   async createVetPrescription (@Res() res:Response) {
    try {
      const pdfBuffer = await this.pdfService.createVetPrescription();

      // Establecer los encabezados de respuesta
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=receta_veterinaria.pdf',
        'Content-Length': pdfBuffer.length,
      });

      // Enviar el buffer de PDF como respuesta
      res.end(pdfBuffer);
    } catch (error) {
      res.status(500).send('Error al generar el PDF');
    }   
    //return await this.pdfService.createVetPrescription()
   }
}
