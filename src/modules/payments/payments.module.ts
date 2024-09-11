import { Module } from '@nestjs/common';
//import { StripeController } from './stripe.controller';
//import { StripeService } from './stripe.service';
//import { MercadoPagoController } from './mercado-pago/mercado-pago.controller';
//import { MercadopagoService } from './mercado-pago/mercado-pago.service';
import { PaymentsController } from './payments.controller';
import { StripeService } from './stripe/stripe.service';

@Module({
  controllers: [PaymentsController],
  providers: [StripeService],
})
export class PaymentsModule {}
