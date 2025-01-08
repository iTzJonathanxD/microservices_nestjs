import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [CanchaController],
  imports: [NatsModule],
})
export class CanchaModule {}
