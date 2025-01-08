import { Module } from '@nestjs/common';
import { SeparacioncanchaController } from './separacioncancha.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [SeparacioncanchaController],
  imports: [NatsModule],
})
export class SeparacioncanchaModule {}
