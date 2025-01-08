import { Module } from '@nestjs/common';
import { DeportistaController } from './deportista.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [DeportistaController],
  imports: [NatsModule],
})
export class DeportistaModule {}
