import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20', // Use whatever API latest version
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async createCheckoutSession(priceId: string) {
    const YOUR_DOMAIN = 'http://localhost:3000'; // Cambiar por el dominio de render

    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // ID del precio del producto en Stripe
          quantity: 1, // La cantidad de productos
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`, // URL de éxito
      cancel_url: `${YOUR_DOMAIN}/cancel`, // URL de cancelación
    });

    return session;
  }
}
