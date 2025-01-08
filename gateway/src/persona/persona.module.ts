import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PersonaController],
  imports: [NatsModule],
})
export class PersonaModule {}
