import { Module } from '@nestjs/common';
import { TipoExamenController } from './tipoexamen.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [TipoExamenController],
  imports: [NatsModule],
})
export class TipoexamenModule {}
