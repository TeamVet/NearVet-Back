import { Controller, Post, Body } from '@nestjs/common';
import { MercadopagoService } from './mercado-pago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}
  @Post()
  async createPayment(@Body() body) {
    const { title, quantity, price } = body;

    try {
      const preference = await this.mercadopagoService.createPreference(title, quantity, price);
      return { preferenceId: preference.id };
    } catch (error) {
      console.error('Error en la creación de la preferencia:', error);
      throw error;
    }
  }
}
