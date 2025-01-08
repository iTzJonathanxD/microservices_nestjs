import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PacienteController],
  imports: [NatsModule],
  providers: [],
})
export class PacienteModule {}
