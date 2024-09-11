import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from '../prescription/entities/prescription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PdfService {

  constructor (@InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>) {}
  
  async createPrescription(prescriptionId: string): Promise<Buffer> {
    // Obtengo los datos de la prescription, la mascota y el veterinario;
    const prescription: Prescription = await this.prescriptionRepository.findOne({
      where: {id: prescriptionId},
      relations: {product:true, 
                  clinicalExamination: {pet: {race:true}, veterinarian: {user:true}}
      }
    })

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ size: [108 * 2.83465, 165 * 2.83465], margin: 20 });

    // Usamos PassThrough para convertir el PDF a un buffer
    const stream = new PassThrough();
    doc.pipe(stream);

    // Título centrado
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#0073e6')
      .text('Receta Veterinaria', { align: 'center' })
      .moveDown(0.5);

    // Posicionamiento inicial para datos de la mascota y la imagen
    const imageX = doc.page.width - 150; // X para la imagen (al lado derecho)
    const textX = 20; // X para los datos (al lado izquierdo)
    const topY = 70; // Posición Y inicial
    
    // Descargar la imagen de la URL y agregarla al PDF
    //if (mascota.imagen) {
      try {
        const response = await axios.get(prescription.clinicalExamination.pet.imgProfile, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        doc.image(imageBuffer, imageX, topY, { width: 120 });
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
      //doc.image("gestos-de-los-perros.jpg", { fit: [150, 150], align: 'center' });
    //}

    //doc.moveDown(1);

    // Datos de la mascota
    doc
      .fontSize(12)
      .font('Helvetica')
      .fillColor('black')
      .text(`Nombre: ${prescription.clinicalExamination.pet.name}`, textX, topY)
      .text(`Raza: ${prescription.clinicalExamination.pet.race.race}`, textX, topY +20)
      .text(`Peso: ${prescription.clinicalExamination.pet.weightCurrent} Kg`, textX, topY +40)
      .text(`Color: ${prescription.clinicalExamination.pet.color}`, textX, topY +60)
     // .moveDown(1);
  
    // Restablecer coordenadas para el texto normal
    doc.moveDown(3); // Aumentamos un poco el espacio después de la información de la mascota

    // Medicamento recetado
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Medicamento Recetado', { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .font('Helvetica')
      .fillColor('black')
      .text(prescription.product.name)
      .moveDown(1.5);

    // Descripción
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text('Descripción', { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .font('Helvetica')
      .fillColor('black')
      .text(prescription.description)
      .moveDown(5);

    // // Dosis, frecuencia y duración
    // doc
    //   .fontSize(14)
    //   .font('Helvetica-Bold')
    //   .fillColor('black')
    //   .text(`Dosis: ${dosis}`)
    //   .text(`Frecuencia: ${frecuencia}`)
    //   .text(`Duración: ${dias} días`)
    //   .moveDown(2);

    // Información del veterinario
    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .fillColor('#0073e6')
      .text(prescription.clinicalExamination.veterinarian.user.name+" "+ prescription.clinicalExamination.veterinarian.user.name, { align: 'right' })
      .text(`Matrícula: ${prescription.clinicalExamination.veterinarian.licence}`, { align: 'right' });

    // Finalizar el documento
    doc.end();

    // Convertir el stream en un buffer
    return await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  }


}
