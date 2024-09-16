import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StripeService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3001 },
    });
  }

  public async callStripeMicroservice(data: any) {
    // Usar lastValueFrom para manejar el observable
    const result = await lastValueFrom(this.client.send('pattern-name', data));
    console.log('Respuesta recibida desde el microservicio:', result);
    return result;
  }
}
