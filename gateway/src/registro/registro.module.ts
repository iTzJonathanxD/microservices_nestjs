import { Module } from '@nestjs/common';
import { RegistroController } from './registro.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RegistroController],
  imports: [NatsModule],
})
export class RegistroModule {}
