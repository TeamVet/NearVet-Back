import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {

  createVetPrescription(data?: {
    mascota: { nombre: string; raza: string; peso: string; color: string; imagen: string };
    medicamento: string;
    descripcion: string;
    dosis: string;
    frecuencia: string;
    dias: string;
    veterinario: { nombre: string; matricula: string };
  }): Promise<Buffer> {
    const { mascota, medicamento, descripcion, dosis, frecuencia, dias, veterinario } = data;

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 50 });

    // Usamos PassThrough para convertir el PDF a un buffer
    const stream = new PassThrough();
    doc.pipe(stream);

    // Título centrado
    doc
      .fontSize(26)
      .font('Helvetica-Bold')
      .fillColor('#0073e6')
      .text('Receta Veterinaria', { align: 'center' })
      .moveDown(2);

    // Imagen de la mascota
    if (mascota.imagen) {
      doc.image(mascota.imagen, { fit: [150, 150], align: 'center' });
    }

    doc.moveDown(1);

    // Datos de la mascota
    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('black')
      .text(`Nombre: ${mascota.nombre}`)
      .text(`Raza: ${mascota.raza}`)
      .text(`Peso: ${mascota.peso}`)
      .text(`Color: ${mascota.color}`)
      .moveDown(2);

    // Medicamento recetado
    doc
      .fontSize(18)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Medicamento Recetado', { underline: true })
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('black')
      .text(medicamento)
      .moveDown(1);

    // Descripción
    doc
      .fontSize(18)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Descripción', { underline: true })
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('black')
      .text(descripcion)
      .moveDown(1);

    // Dosis, frecuencia y duración
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('black')
      .text(`Dosis: ${dosis}`)
      .text(`Frecuencia: ${frecuencia}`)
      .text(`Duración: ${dias} días`)
      .moveDown(2);

    // Información del veterinario
    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .fillColor('#0073e6')
      .text(veterinario.nombre, { align: 'right' })
      .text(`Matrícula: ${veterinario.matricula}`, { align: 'right' });

    // Finalizar el documento
    doc.end();

    // Convertir el stream en un buffer
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  }
}
