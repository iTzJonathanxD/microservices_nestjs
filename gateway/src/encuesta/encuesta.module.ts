import { Module } from '@nestjs/common';
import { EncuestaController } from './encuesta.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EncuestaController],
  imports: [NatsModule],
})
export class EncuestaModule {}
