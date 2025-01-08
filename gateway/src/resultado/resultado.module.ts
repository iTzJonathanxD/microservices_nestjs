import { Module } from '@nestjs/common';
import { ResultadoController } from './resultado.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ResultadoController],
  imports: [NatsModule],
})
export class ResultadoModule {}
