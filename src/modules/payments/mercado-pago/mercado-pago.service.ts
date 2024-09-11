import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor() {
    // Configurar Mercado Pago con tu access token desde las variables de entorno
    this.client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
    this.preference = new Preference(this.client);
  }

  // Declaración del método createPreference
  async createPreference(title: string, quantity: number, price: number): Promise<any> {
    try {
      // Llamada al API de Mercado Pago para crear la preferencia de pago
      const response = await this.preference.create({
        body: {
          items: [
            {
              id: 'id',
              title,
              quantity,
              unit_price: price,
              category_id: '',
              currency_id: 'ARS',
              description: 'aasd',
              picture_url: 'imagen',
            },
          ],
        },
        requestOptions: {},
      });
      return response;
    } catch (error) {
      console.error('Error en la creación de la preferencia:', error);
      throw error;
    }
  }
  async getPreference() {
    await this.preference.get({ preferenceId: '<PREFERENCE_ID>' }).then(console.log).catch(console.log);
  }
}
